import { FastifyInstance } from "fastify";
import { AuthPostRoutes } from "./auth.post.routes";

/**
 * Enregistre les routes liées à l'authentification dans l'application Fastify.
 *
 * @param {FastifyInstance} app - Instance Fastify sur laquelle enregistrer les routes.
 * @returns {Promise<void>} - Une promesse qui se résout lorsque les routes sont enregistrées.
 */
export async function AuthRoutes(app: FastifyInstance): Promise<void> {
	const routes = [{ handler: AuthPostRoutes }];

	routes.forEach(({ handler }) => {
		app.register(handler, { prefix: "/auth" });
	});
}
