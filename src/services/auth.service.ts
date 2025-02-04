import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { FastifyInstance, FastifyRequest } from "fastify";
import Redis from "ioredis";
import { EnvironnementLevel } from "../config/environnement.config";
import { LoginDto } from "../dtos/login.dto";
import { RegisterDto } from "../dtos/register.dto";
import { VerifyPayloadType } from "../types/payload.types";

const prisma = new PrismaClient();

export class AuthService {
	private redis = new Redis();
	constructor() {
		this.redis = new Redis({
			host: process.env.REDIS_HOST,
			port: Number(process.env.REDIS_PORT || "6379"),
			password: process.env.REDIS_PASSWORD,
		});
	}

	private BLACKLIST_PREFIX = "jwt-blacklist:";

	async register({ email, name, password }: RegisterDto) {
		console.log("📥 Création de l'utilisateur...");

		// 🔍 Vérifier si l'utilisateur existe déjà
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			console.error("❌ Erreur : Cet email est déjà utilisé !");
			throw new Error("Cet email est déjà utilisé !");
		}

		// Vérifier si le mail est valide
		if (!email.includes("@")) {
			console.error("❌ Erreur : Cet email n'est pas valide !");
			throw new Error("Cet email n'est pas valide !");
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		console.log("🔒 Mot de passe haché !");

		const user = await prisma.user.create({
			data: {
				email,
				name,
				password: hashedPassword,
				role: "user",
			},
		});

		console.log("🎉 Utilisateur créé :", user);
		return user; // 🔴 Ici, il ne doit PAS y avoir de génération de token !
	}

	async login({ email, password }: LoginDto, app: FastifyInstance) {
		console.group("login@service");
		console.log("💡 Entrée dans la fonction login");
		console.log("🔹 Vérification de l'utilisateur :", email);

		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			console.log("❌ Utilisateur introuvable :", email);
			throw new Error("Invalid credentials");
		}

		console.log("🔹 Mot de passe reçu :", password);
		console.log("🔹 Mot de passe stocké :", user.password);

		const passwordMatch = await bcrypt.compare(password, user.password);
		console.log("🔹 bcrypt.compare() result :", passwordMatch);

		if (!passwordMatch) {
			console.log("❌ Mot de passe incorrect");
			throw new Error("Invalid credentials");
		}
		const expiresIn = process.env.JWT_EXPIRES_IN || "1h"; // 🕒 Expire en 1 heure par défaut

		console.log("expiration du token :", expiresIn.toString());

		// Génération du token JWT
		const token = app.jwt.sign(
			{
				id: user.id,
				role: user.role,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
				email: user.email,
				name: user.name,
			},
			{ expiresIn },
		);
		const decodedToken = app.jwt.decode<{ exp: number }>(token);
		if (!decodedToken) {
			console.error("❌ Erreur lors du décodage du token");
			throw new Error("Erreur lors du décodage du token");
		}
		const expirationDate = new Date(decodedToken.exp * 1000).toLocaleString(
			"fr-FR",
			{ timeZone: "Europe/Paris" },
		);
		console.log("🔑 Token généré (@service) :", {
			token: {
				value: token,
				expires: expirationDate,
			},
		});
		// Stockage du token en Redis
		console.log("🔹 Stockage du token en Redis");
		console.log("🔹 Clé Redis :", `user:${user.id}:token`);
		await this.redis.set(`user:${user.id}:token`, token, "EX", 86400); // Expiration 1 jour
		console.groupEnd();
		return { token, user };
	}

	static async checkAuthenticatedUsers(
		app: FastifyInstance,
		redis: Redis,
	): Promise<boolean> {
		try {
			const keys = await redis.keys("user:*:token");
			if (keys.length === 0) return false;

			const tokens = await redis.mget(keys); // Récupération optimisée

			for (let i = 0; i < tokens.length; i++) {
				const token = tokens[i];
				if (!token) continue;

				try {
					const decoded: VerifyPayloadType = app.jwt.verify(token); // Vérification du token
					const debugInfo = {
						email: decoded.email,
						id: decoded.id,
						exp: new Date(decoded.exp * 1000).toISOString(),
					};
					if (process.env.ENVIRONNEMENT_LEVEL === EnvironnementLevel.DEVELOPMENT) {
						console.table(debugInfo);
          }
					return true;
				} catch (error) {
					console.warn(`⚠️ Token expiré pour ${keys[i]}`);
					await redis.del(keys[i]); // Suppression du token expiré
				}
			}

			return false;
		} catch (error) {
			console.error(
				"❌ Erreur lors de la vérification des utilisateurs authentifiés :",
				error,
			);
			return false;
		}
	}

	async checkAuthenticatedUsers(): Promise<boolean> {
		try {
			const keys = await this.redis.keys("user:*:token"); // 🔍 Vérifie si des tokens existent en Redis
			return keys.length > 0; // ✅ S'il y a au moins un token actif, un utilisateur est connecté
		} catch (error) {
			console.error(
				"❌ Erreur lors de la vérification des utilisateurs authentifiés :",
				error,
			);
			return false;
		}
	}

	async logout(request: FastifyRequest): Promise<{ message: string }> {
		try {
			const authHeader = request.headers.authorization;

			if (!authHeader || !authHeader.startsWith("Bearer ")) {
				console.warn("⚠️ Aucune autorisation trouvée, déconnexion anonyme.");
				return { message: "Déconnexion réussie (aucun token fourni)" };
			}

			const token = authHeader.split(" ")[1];

			// ✅ Vérifier si le token est déjà en blacklist
			if (await this.isTokenBlacklisted(token)) {
				console.warn("⚠️ Token déjà blacklisté.");
				return { message: "Déconnexion réussie (token déjà invalidé)" };
			}

			// ✅ Ajouter le token à la blacklist en Redis
			const decoded = request.server.jwt.decode(token) as { exp?: number };
			if (!decoded?.exp) {
				return { message: "Impossible de récupérer l'expiration du token" };
			}

			const expirationTime = decoded.exp - Math.floor(Date.now() / 1000);
			if (expirationTime > 0) {
				await this.redis.setex(
					`${this.BLACKLIST_PREFIX}${token}`,
					expirationTime,
					"blacklisted",
				);
				console.log(
					`🔹 Token ajouté à la blacklist pour ${expirationTime} secondes.`,
				);
			}

			return { message: "Déconnexion réussie" };
		} catch (error) {
			console.error("❌ Erreur lors de la déconnexion :", error);
			throw new Error("Erreur lors de la déconnexion");
		}
	}

	private async isTokenBlacklisted(token: string) {
		const isBlacklisted = await this.redis.exists(
			`${this.BLACKLIST_PREFIX}${token}`,
		);
		return isBlacklisted === 1;
	}

	async getUserToken(userId: number): Promise<string | null> {
		return await this.redis.get(`user:${userId}:token`);
	}
}
