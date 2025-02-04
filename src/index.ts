import jwt from "@fastify/jwt";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import dotenv from "dotenv";
import fastify from "fastify";
import { Redis } from "ioredis";
import { AuthRoutes } from "./routes/auth.routes";
import { UserRoutes } from "./routes/user.routes";
import { AuthService } from "./services/auth.service";
import { ResponseHandler } from "./utils/response.handler";
import { EnvironnementLevel } from "./config/environnement.config";
import { ArticleRoutes } from "./routes/article.routes";

dotenv.config();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

const app = fastify({
	logger: false
    // process.env.NODE_ENV === EnvironnementLevel.DEVELOPMENT || false,
});

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT || "6379"),
  password: process.env.REDIS_PASSWORD,
});
// Enregistrement du plugin JWT
app.register(jwt, {
	sign: { expiresIn: JWT_EXPIRES_IN },
	secret: JWT_SECRET,
  
});

type RouteOptions = {
	url: string;
	method?: string;
	statusCode?: number;
	displayInConsole?: boolean;
};

const publicRoutes: RouteOptions[] = [
	{ url: "/docs", displayInConsole: false },
	{ url: "/auth/login", method: "POST" },
	{ url: "/auth/register", method: "POST" },
	{ url: "/auth/logout", method: "POST" }, // Pour éviter la vérification du token
	{ url: "/auth/amILoggedIn", method: "GET" },
  { url: "/articles", method: "GET" },
  { url: "/articles/:id", method: "GET" },
];

app.addHook("onRequest", async (request, reply) => {
	const isPublicRoute = publicRoutes.some((route) => {
		if (!request.raw.url?.startsWith(route.url)) return false;

		if (
			route.method &&
			request.method.toUpperCase() !== route.method.toUpperCase()
		)
			return false;

		return true;
	});
	if (isPublicRoute) {
		if (
			publicRoutes.find(
				(route) => request.method.toUpperCase() !== route.method?.toUpperCase(),
			)
		) {
			return false;
		}
		return;
	}
	// Si ce n'est pas une route publique, on passe à la vérification du token
	if (!request.headers.authorization) {
		request.log.warn(`Token manquant pour la route ${request.url}`);
		return reply.status(401).send({
			status: "error",
			message: "Token manquant",
		});
	}
	try {
		await request.jwtVerify();
		request.log.info(`Token vérifié pour la route ${request.url}`);
	} catch (error: any) {
		request.log.error(
			`Token invalide ou expiré pour ${request.raw.url}`,
			error,
		);
		return reply
			.status(401)
			.send({ status: "error", message: "Token invalide ou expiré" });
	}
});

// Gestion des erreurs globales
app.setErrorHandler((error, request, reply) => {
	ResponseHandler.error("❌ Une erreur s'est produite", error, request);

	reply.status(error.statusCode || 500).send({
		status: "error",
		message: error.message || "Erreur interne du serveur",
	});
});

// Hook pour formater et enrichir la réponse
app.addHook("onSend", async (request, reply, payload) => {
	// ✅ Vérifie si le payload est une string vide et corrige
	if (typeof payload === "string" && payload.trim() === "") {
		console.warn("⚠️ Réponse vide détectée, correction...");
		return JSON.stringify({
			status: "error",
			message: "Réponse vide inattendue",
		});
	}

	// ✅ Ajoute l'utilisateur connecté dans la réponse sans écraser le payload
	if (request.user) {
		try {
			const parsedPayload =
				typeof payload === "string" ? JSON.parse(payload) : payload;
			return JSON.stringify({
				...parsedPayload,
				user: request.user,
			});
		} catch (error: any) {
			console.error(
				"⚠️ Erreur lors de l'ajout de l'utilisateur à la réponse !",
			);
			return payload;
		}
	}

	return payload;
});

// Configuration de Swagger
app.register(swagger, {
	openapi: {
		info: {
			title: "API de gestion des articles",
			description: "Documentation de l'API",
			version: "1.0.0",
		},
		components: {
			securitySchemes: {
				BearerAuth: {
					type: "http",
					scheme: "bearer",
				},
			},
		},
		security: [{ BearerAuth: [] }],
	},
});

// Swagger UI accessible à `/docs`
app.register(swaggerUi, {
	routePrefix: "/docs",

	uiConfig: {
		docExpansion: "list",
		deepLinking: true,
	},

	staticCSP: true,
	transformSpecification: (swaggerObject) => swaggerObject,
});

// Route de test pour vérifier si l'API fonctionne
app.get("/", async () => {
	return {
		message: "API fonctionne !",
		goToDocs: "http://localhost:3000/docs",
	};
});
// Enregistrement des routes
app.register(AuthRoutes);
app.register(UserRoutes);
app.register(ArticleRoutes);


// Affichage des routes enregistrées pour debug
if (process.env.ENVIRONNEMENT_LEVEL === EnvironnementLevel.DEVELOPMENT)  {
  app.after(() => {
    console.log("[INFO] Fastify est prêt, initialisation des ressources...");
    console.log(app.printRoutes({ commonPrefix: false,   }));  
  });}

app.ready(async () => {
	app.log.info("🚀 Fastify est maintenant prêt !");
	app.log.info(app.printRoutes({ commonPrefix: false }));
	const isAuthenticated = await AuthService.checkAuthenticatedUsers(app, redis);
	app.log.info(
		`📄 Swagger disponible à l'adresse : http://localhost:${PORT}/docs`,
	);
	app.log.info(`[INFO] isAuthenticated : ${isAuthenticated}`);
	app.log.info("✅ Serveur en écoute et opérationnel !");
});

// Lancement du serveur
const start = async () => {
	try {
		await app.listen({ port: PORT, host: "0.0.0.0" });
		app.log.info(`Serveur en écoute sur http://localhost:${PORT}/docs`);
	} catch (err) {
		app.log.error("Erreur au démarrage du serveur :", err);
		process.exit(1);
	}
};

start();
