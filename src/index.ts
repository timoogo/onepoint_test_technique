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
import { HttpMessages, HttpStatus } from "./config/http.config";
import { RedisService } from "./services/redis.service";
import { RedisDebugService } from "./services/redis.debug.service";
import { Prisma } from "@prisma/client";
import { PrismaService } from "./services/prisma.service";

dotenv.config();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

const app = fastify({
	logger: false
    // process.env.NODE_ENV === EnvironnementLevel.DEVELOPMENT || false,
});

const redisService = process.env.ENVIRONNEMENT_LEVEL === EnvironnementLevel.DEVELOPMENT
  ? new RedisDebugService() // ✅ En dev, on utilise la version avec debug
  : new RedisService(); // ✅ En prod, la version sécurisée sans debug

export { redisService };

const prisma = PrismaService.getInstance();

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
	{ url: "/users/register", method: "POST" },
	{ url: "/auth/logout", method: "POST" }, // Pour éviter la vérification du token
	{ url: "/auth/amILoggedIn", method: "GET" },
  { url: "/articles", method: "GET" },
  { url: "/articles/:id", method: "GET" },
];

app.addHook("onRequest", async (request, reply) => {
	const isPublicRoute = publicRoutes.some(
	  (route) =>
		request.raw.url?.startsWith(route.url) &&
		(!route.method || request.method.toUpperCase() === route.method.toUpperCase())
	);
  
	if (isPublicRoute) {
	  return;
	}
  
	// Vérification de l'existence du token
	if (!request.headers.authorization) {
	  request.log.warn(`${HttpMessages.TOKEN_MISSING} pour ${request.url}`);
	  return reply.status(HttpStatus.UNAUTHORIZED).send({
		status: "error",
		errorCode: HttpStatus.UNAUTHORIZED,
		message: HttpMessages.TOKEN_MISSING,
	  });
	}
  
	// Vérification du token JWT
	try {
	  await request.jwtVerify();
	  request.log.info(`Token vérifié pour la route ${request.url}`);
	} catch (error: any) {
	  request.log.error(`${HttpMessages.TOKEN_INVALID} pour ${request.raw.url}`, error);
	  return reply.status(HttpStatus.UNAUTHORIZED).send({
		status: "error",
		errorCode: HttpStatus.UNAUTHORIZED,
		message: HttpMessages.TOKEN_INVALID,
	  });
	}
  });
  
  

// Gestion des erreurs globales
app.setErrorHandler((error, request, reply) => {
	ResponseHandler.error("❌ Une erreur s'est produite", error, request);
  
	const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
	const message = error.message || HttpMessages.INTERNAL_SERVER_ERROR;
  
	reply.status(statusCode).send({
	  status: "error",
	  errorCode: statusCode,
	  message,
	});
  });

// Hook pour formater et enrichir la réponse
app.addHook("onSend", async (request, reply, payload) => {
    try {
        // ✅ Vérifier si le payload est vide et renvoyer un message d'erreur cohérent
        if (typeof payload === "string" && payload.trim() === "") {
            request.log.warn("⚠️ Réponse vide détectée, correction...");
            return JSON.stringify({
                status: "error",
                message: "Réponse vide inattendue",
            });
        }

        // ✅ Vérifier si le payload est une réponse JSON
        let parsedPayload;
        try {
            parsedPayload = typeof payload === "string" ? JSON.parse(payload) : payload;
        } catch (err) {
            request.log.error("⚠️ Impossible de parser le payload en JSON :", err);
            return payload; // Ne pas modifier si le parsing échoue
        }

        // ✅ Si la réponse contient déjà un `user`, ne rien modifier
        if (parsedPayload && typeof parsedPayload === "object" && "user" in parsedPayload) {
            request.log.info("ℹ️ L'utilisateur est déjà présent dans la réponse, aucune modification.");
            return payload;
        }

        // ✅ Si `request.user` est présent, NE PAS l’injecter dans toutes les réponses
        if (request.user) {
            request.log.info("ℹ️ Utilisateur détecté, mais non injecté dans la réponse.");
        }

        // ✅ Retourner le payload d'origine sans le modifier
        return payload;
    } catch (error) {
        request.log.error("⚠️ Erreur dans le hook onSend :", error);
        return payload; // Ne pas interrompre la requête en cas d'erreur dans onSend
    }
});

/**
 * Fermeture de la connexion à la base de données lors de la fermeture de l'application
 */
app.addHook("onClose", async () => {
	try{
		app.log.info("Fermeture de la connexion à la base de données...");
		await prisma.disconnect();
		await redisService.disconnect();
		app.log.info("Connexion à la base de données fermée avec succès.");
	} catch (error) {
		app.log.error("❌ Erreur lors de la fermeture de la connexion à la base de données :", error);
	}
})


  
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
	const isAuthenticated = await redisService.checkAuthenticatedUsers();
		app.log.info(
		`📄 Swagger disponible à l'adresse : http://localhost:${PORT}/docs`,
	);
	app.log.info(`[INFO] isAuthenticated : ${isAuthenticated}`);
	app.log.info("✅ Serveur en écoute et opérationnel !");
});
const shutdown = async (signal: string) => {
    console.log(`🛑 Shutdown appelé avec le signal : ${signal}`);
    app.log.info(`🔴 Signal reçu (${signal}), fermeture de l'application...`);
    try {
        await prisma.disconnect();
        await redisService.disconnect();
        app.log.info("✅ Application fermée proprement.");
    } catch (error) {
        app.log.error("❌ Erreur lors de l'arrêt du serveur :", error);
    } finally {
        console.log("💀 Processus en train de s'arrêter...");
        process.exit(1);
    }
};


// ✅ Attacher les signaux système proprement
const signals = ["SIGINT", "SIGTERM"];
signals.forEach((signal) => {
	console.log(`🔴 Signal reçu (${signal}), fermeture de l'application...`);
    process.on(signal, () => shutdown(signal));
});

// ✅ `beforeExit` pour fermer proprement avant la sortie
process.on("beforeExit", async () => {
    console.log("⚠️ Processus en train de se fermer...");
    await shutdown("beforeExit");
});

// ✅ `exit` pour logguer une dernière info avant l'arrêt total
process.on("exit", () => {
    console.log("💀 Processus terminé.");
});



// Lancement du serveur
const start = async () => {
	try {
		await app.listen({ port: PORT, host: "0.0.0.0" });
		app.log.info(`🚀 Serveur en écoute sur http://localhost:${PORT}/docs`);

		if (redisService instanceof RedisDebugService) {
			// 🔹 Récupérer les tokens stockés et blacklistés uniquement en DEV
			const allTokens = await redisService.listAllTokens();
			const blacklistedTokens = await redisService.listBlacklistedTokens();

			console.log(`🔍 ${allTokens.length} tokens stockés en Redis.`);
			console.table([{ "Tokens stockés": allTokens.length, "Tokens blacklistés": blacklistedTokens.length }]);

			// 🔹 Suppression de tous les tokens blacklistés
			if (blacklistedTokens.length > 0) {
				for (const token of blacklistedTokens) {
					await redisService.unrevokeToken(token);
				}
				console.log(`✅ ${blacklistedTokens.length} tokens retirés de la blacklist.`);
			} else {
				console.log(`ℹ️ Aucun token à retirer de la blacklist.`);
			}
		}
	} catch (err) {
		app.log.error("❌ Erreur au démarrage du serveur :", err);
		console.error({err});
		process.exit(1);
	}
};

start();
