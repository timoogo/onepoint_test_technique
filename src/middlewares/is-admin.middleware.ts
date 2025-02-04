import { FastifyRequest, FastifyReply } from "fastify";
import { ResponseHandler } from "../utils/response.handler";

export const isAdmin = async (request: FastifyRequest, reply: FastifyReply) => {
  console.log("🔍 Utilisateur détecté :", request.user); // Ajout du log
  if (!request.user || request.user.role !== "admin") {
    ResponseHandler.error("Accès interdit : rôle admin requis", null, request);
    
    return reply.status(403).send({
      status: "error",
      message: "Accès interdit : rôle admin requis",
    });
  }
};
