import { FastifyInstance } from "fastify";
import { ResponseHandler } from "../utils/response.handler";
import { AuthPostRoutes } from "./auth.post.routes";

export async function AuthRoutes(app: FastifyInstance) {
	ResponseHandler.info(
		"Enregistrement des routes liées à l'authentification...",
	);
	app.register(AuthPostRoutes, { prefix: "/auth" });
}
