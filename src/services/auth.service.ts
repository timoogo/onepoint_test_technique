import bcrypt from "bcryptjs";
import { FastifyInstance, FastifyRequest } from "fastify";
import { LoginDto } from "../dtos/login.dto";
import { RegisterDto } from "../dtos/register.dto";
import { RedisService } from "../services/redis.service";
import { PrismaService } from "./prisma.service";

const prisma = PrismaService.getInstance().getPrisma();

export class AuthService {
	private redisService: RedisService;

	constructor() {
		this.redisService = new RedisService();
	}

	public async register({ email, name, password }: RegisterDto) {
		const existingUser = await prisma.user.findUnique({ where: { email } });
		if (existingUser) {
			throw new Error("This email is already used !");
		}

		if (!email.includes("@")) {
			throw new Error("This email is not valid !");
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await prisma.user.create({
			data: { email, name, password: hashedPassword, role: "user" },
		});

		console.log("User created :", user);
		return user;
	}

	public async login({ email, password }: LoginDto, app: FastifyInstance) {
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			throw new Error("Invalid credentials");
		}

		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			throw new Error("Invalid credentials");
		}

		const expiresIn = process.env.JWT_EXPIRES_IN || "1h";
		const token = app.jwt.sign(
			{
				id: user.id,
				role: user.role,
				email: user.email,
				name: user.name,
				updatedAt: user.updatedAt,
				createdAt: user.createdAt,
			},
			{ expiresIn },
		);

		await this.redisService.storeUserToken(user.id, token);
		return { token, user };
	}

	public async logout(request: FastifyRequest): Promise<{ message: string }> {
		const authHeader = request.headers.authorization;
		if (!authHeader)
			return { message: "Successfully logged out (no token provided)" };

		const token = authHeader.split(" ")[1];
		if (await this.redisService.isTokenBlacklisted(token)) {
			return { message: "Successfully logged out (token already invalidated)" };
		}

		const decoded = request.server.jwt.decode(token) as { exp?: number };
		if (!decoded?.exp) {
			return { message: "Unable to retrieve token expiration" };
		}

		const expirationTime = decoded.exp - Math.floor(Date.now() / 1000);
		if (expirationTime > 0) {
			await this.redisService.blacklistToken(token, expirationTime);
		}

		return { message: "Successfully logged out" };
	}

	public async isTokenBlacklisted(token: string): Promise<boolean> {
		return await this.redisService.isTokenBlacklisted(token);
	}
}
