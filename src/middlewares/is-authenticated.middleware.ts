import { FastifyReply, FastifyRequest } from "fastify";
import { redisService } from "..";
import { HttpMessages, HttpStatus } from "../config/http.config";
import { ResponseHandler } from "../utils/response.handler";

export const isAuthenticated = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	try {
		request.log.info("🔑 Vérification du token dans le header", {
			authorization: request.headers.authorization,
		});

		if (!request.headers.authorization) {
			return reply.status(HttpStatus.UNAUTHORIZED).send({
				status: "error",
				errorCode: HttpStatus.UNAUTHORIZED,
				message: HttpMessages.TOKEN_MISSING,
			});
		}

		const token = request.headers.authorization.split(" ")[1];

		if (await redisService.isTokenBlacklisted(token)) {
			return reply.status(HttpStatus.UNAUTHORIZED).send({
				status: "error",
				errorCode: HttpStatus.UNAUTHORIZED,
				message: HttpMessages.TOKEN_BLACKLISTED,
			});
		}

		await request.jwtVerify();
		ResponseHandler.info("✅ Utilisateur authentifié", request.user, request);
		request.log.info("✅ JWT validé avec succès", { user: request.user });
	} catch (error) {
		request.log.error("❌ Erreur JWT", error);
		return reply.status(HttpStatus.UNAUTHORIZED).send({
			status: "error",
			errorCode: HttpStatus.UNAUTHORIZED,
			message: HttpMessages.TOKEN_INVALID,
		});
	}
};
