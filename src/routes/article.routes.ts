import { FastifyInstance } from "fastify";
import { EnvironnementLevel } from "../config/environnement.config";
import { COLORS } from "../utils/colors.tui.utils";
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
		{ handler: articleGetRoutes, description: "récupérations" },
		{ handler: articlePostRoutes, description: "ajouts" },
		{ handler: articlePutRoutes, description: "modifications" },
		{ handler: articleDeleteRoutes, description: "suppressions" },
	];

	if (process.env.NODE_ENV === EnvironnementLevel.DEVELOPMENT) {
		console.group(
			COLORS.BLUE + "Enregistrement des routes d'articles" + COLORS.RESET,
		);
	}

	routes.forEach(({ handler, description }) => {
		if (process.env.NODE_ENV === EnvironnementLevel.DEVELOPMENT) {
			console.log(
				COLORS.GREEN +
					`Routes liées aux ${description} enregistrées` +
					COLORS.RESET,
			);
		}
		app.register(handler, { prefix: "/articles" });
	});

	if (process.env.NODE_ENV === EnvironnementLevel.DEVELOPMENT) {
		console.groupEnd();
		console.log(
			COLORS.BLUE +
				"Toutes les routes d'articles ont été enregistrées avec succès !" +
				COLORS.RESET,
		);
	}
}
