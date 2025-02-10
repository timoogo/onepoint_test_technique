import { FastifyInstance } from "fastify";
import { EnvironnementLevel } from "../config/environnement.config";
import { COLORS } from "../utils/colors.tui.utils";
import { AuthPostRoutes } from "./auth.post.routes";

/**
 * Enregistre les routes liées à l'authentification dans l'application Fastify.
 *
 * @param {FastifyInstance} app - Instance Fastify sur laquelle enregistrer les routes.
 * @returns {Promise<void>} - Une promesse qui se résout lorsque les routes sont enregistrées.
 */
export async function AuthRoutes(app: FastifyInstance): Promise<void> {
	const routes = [
		{ handler: AuthPostRoutes, description: "authentification" },
	];

	if (process.env.NODE_ENV === EnvironnementLevel.DEVELOPMENT) {
		console.group(COLORS.BLUE + "Enregistrement des routes liées à l'authentification" + COLORS.RESET);
	}

	routes.forEach(({ handler, description }) => {
		if (process.env.NODE_ENV === EnvironnementLevel.DEVELOPMENT) {
			console.log(COLORS.GREEN + `Routes liées aux ${description} enregistrées` + COLORS.RESET);
		}
		app.register(handler, { prefix: "/auth" });
	});

	if (process.env.NODE_ENV === EnvironnementLevel.DEVELOPMENT) {
		console.groupEnd();
		console.log(COLORS.BLUE + "Toutes les routes liées à l'authentification ont été enregistrées avec succès !" + COLORS.RESET);
	}
}
