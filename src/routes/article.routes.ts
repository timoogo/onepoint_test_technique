import { FastifyInstance } from "fastify";
import { ResponseHandler } from "../utils/response.handler";
import { articleGetRoutes } from "./article.get.routes";
import { articlePostRoutes } from "./article.post.routes";
import { articlePutRoutes } from "./article.put.routes";
import { articleDeleteRoutes } from "./article.delete.routes";

export async function ArticleRoutes(app: FastifyInstance) {
	ResponseHandler.info("Enregistrement des routes liées aux articles...");

	// Routes GET (liste et article spécifique)
	app.register(articleGetRoutes, { prefix: "/articles" });

	// Routes POST (ajout d'un nouvel article)
	app.register(articlePostRoutes, { prefix: "/articles" });

	// Routes PUT (modification d'un article)
	app.register(articlePutRoutes, { prefix: "/articles" });

	// Routes DELETE (suppression d'un article)
	 app.register(articleDeleteRoutes, { prefix: "/articles" });
	ResponseHandler.success("Routes liées aux articles enregistrées avec succès.");
}
