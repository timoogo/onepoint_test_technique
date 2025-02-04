import { FastifyReply, FastifyRequest } from "fastify";
import { ResponseHandler } from "../utils/response.handler";

export const isAuthenticated = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    console.log("🔑 Token reçu dans le header:", request.headers.authorization); // Ajout du log

    if (!request.headers.authorization) {
      console.warn("⚠️ Aucune autorisation trouvée dans l'en-tête de la requête !");
      return reply.status(401).send({
        status: "error",
        message: "Token manquant",
      });
    }

    await request.jwtVerify();
    const decoded = request.user; // 🔥 JWT décodé
    ResponseHandler.info("✅ Utilisateur authentifié", decoded, request);

    console.log("✅ Utilisateur après vérification JWT:", request.user); // Vérifie ce qui est attaché
  } catch (error) {
    console.error("❌ Erreur JWT:", error);
    console.log({ user: request.user });

    return reply.status(401).send({
      status: "error",
      message: "Token invalide ou expiré",
    });
  }
};
