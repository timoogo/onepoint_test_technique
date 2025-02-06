import { FastifyRequest, FastifyReply } from "fastify";
import { ResponseHandler } from "../utils/response.handler";
import { HttpStatus, HttpMessages } from "../config/http.config";


export const isAdmin = async (request: FastifyRequest, reply: FastifyReply) => {
  request.log.info("🔍 Vérification du rôle utilisateur :", { user: request.user });

  if (!request.user || request.user.role !== "admin") {
    ResponseHandler.error(HttpMessages.FORBIDDEN, null, request);

    return reply.status(HttpStatus.FORBIDDEN).send({
      status: "error",
      errorCode: HttpStatus.FORBIDDEN,
      message: HttpMessages.FORBIDDEN,
    });
  }
};

