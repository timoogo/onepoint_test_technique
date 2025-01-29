import fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import jwt from "@fastify/jwt";
import dotenv from "dotenv";

import { authRoutes } from "./routes/auth.routes";
import { UserRoutes } from "./routes/user.routes";
import { ArticleRoutes } from "./routes/article.routes";
import { ResponseHandler } from "./utils/response.handler";

dotenv.config();

const app = fastify();

// Enregistrement de JWT pour la gestion des tokens
app.register(jwt, {
  secret: process.env.JWT_SECRET || "supersecret",
});








app.addHook("onRequest", async (request, reply) => {
  const now = new Date().toISOString();
  const method = request.method;
  const url = request.url;
  const ip = request.ip;

  try {
    // Log initial pour toute requête
    console.log(`[INFO][${now}][${method}][${url}][IP: ${ip}]`);

    // Vérification JWT si présent
    if (request.headers.authorization) {
      await request.jwtVerify(); // Décode et associe `request.user`
    }
  } catch (err) {
    // Log en cas d'erreur
    console.error(`[ERROR][${now}][${method}][${url}][IP: ${ip}] - Token invalide ou manquant`);
    return reply.status(401).send({ message: "Token invalide ou manquant" });
  }
});



app.addHook("onSend", async (request, reply, payload) => {
  // console.log("📤 Response body AVANT transformation :", payload);
  // console.log("📢 Type de payload :", typeof payload);
  // console.log("📢 Content-Type envoyé :", reply.getHeader("content-type"));

  // ✅ Vérifie si le payload est une string vide et renvoie un JSON correct
  if (typeof payload === "string" && payload.trim() === "") {
    console.warn("⚠️ Fastify tente d'envoyer un payload vide, on le corrige !");
    return JSON.stringify({ status: "error", message: "Réponse vide inattendue" });
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
    security: [{ BearerAuth: [] }], // Applique JWT à toutes les routes par défaut
  },
});

// Swagger UI accessible à `/docs`
app.register(swaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: true,
  },
  staticCSP: true,
  transformSpecification: (swaggerObject) => swaggerObject,
  transformSpecificationClone: true,
});

// Route de test pour vérifier si l'API fonctionne
app.get("/", async () => {
  return { message: "API fonctionne !",
    goToDocs: "http://localhost:3000/docs" };
});

// Enregistrement des routes
app.register(authRoutes);
app.register(UserRoutes);
app.register(ArticleRoutes)


// Affichage des routes enregistrées pour debug
app.ready(() => {
  console.log(app.printRoutes());
});

// Lancement du serveur
const start = async () => {
  try {
    await app.listen({ port: 3000 });
    
    console.log("Serveur en écoute sur http://localhost:3000/docs");
  } catch (err) {
    console.error("Erreur au démarrage du serveur :", err);
    process.exit(1);
  }
};


start();
