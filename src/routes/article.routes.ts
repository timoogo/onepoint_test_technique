import { FastifyInstance } from "fastify";
import { articleDeleteRoutes } from "./article.delete.routes";
import { articleGetRoutes } from "./article.get.routes";
import { articlePostRoutes } from "./article.post.routes";
import { articlePutRoutes } from "./article.put.routes";

/**
 * Enregistre les routes liées aux articles dans l'application Fastify.
 *
 * @param {FastifyInstance} app - Instance Fastify sur laquelle enregistrer les routes.
 * @returns {Promise<void>} - Une promesse qui se résout lorsque les routes sont enregistrées.
 */
export async function ArticleRoutes(app: FastifyInstance): Promise<void> {
	const routes = [
		{ handler: articleGetRoutes },
		{ handler: articlePostRoutes },
		{ handler: articlePutRoutes },
		{ handler: articleDeleteRoutes },
	];

	routes.forEach(({ handler }) => {
		app.register(handler, { prefix: "/articles" });
	});
}
