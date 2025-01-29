import { FastifyReply, FastifyRequest } from "fastify";
import { ResponseHandler } from "../utils/response.handler";

export const isAdmin = async (request: FastifyRequest, reply: FastifyReply) => {
  if (!request.user || request.user.role !== "admin") {
    return ResponseHandler.error(reply, "Accès interdit : rôle admin requis", 403);
  }
};
