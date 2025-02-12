import { FastifyInstance } from "fastify";
import { HttpStatus } from "../config/http.config";
import { isAdmin } from "../middlewares/is-admin.middleware";
import { isAuthenticated } from "../middlewares/is-authenticated.middleware";
import { ArticleService } from "../services/article.service";
import { UserService } from "../services/user.service";
import { ResponseHandler } from "../utils/response.handler";
import { UserConfig } from "../config/user.config";
import { ArticleConfig } from "../config/article.config";
import { ArticleSchemas } from "../schemas/article.schema";
import { ExampleGenerator } from "../utils/example.generator.utils";


/**
 * Routes de modification d'articles
 * @param fastify Instance Fastify
 */
export async function articlePutRoutes(fastify: FastifyInstance) {


	const reassignExamples = await ExampleGenerator.generateReassignExample();
	const articleService = new ArticleService();
	const userService = new UserService();
	/**
	 * Route PUT /articles/:id
	 * Modifier un article (Admin seulement)
	 */
	fastify.put<{
		Params: { id: number };
		Body: { title?: string; description?: string; content?: string };
	}>(
		"/:id",
		{
			preHandler: [isAuthenticated, isAdmin], // ✅ Vérifie l'authentification AVANT l'admin
			schema: ArticleSchemas.UpdateArticle,
			
		},
		async (request, reply) => {
			const { id } = request.params;
			const { title, description, content } = request.body;

			ResponseHandler.info("🔍 Début de la modification d'un utilisateur", null, request, { minimalLogLevel: ArticleConfig.minimalLogLevel });
			ResponseHandler.debug("📌 Requête reçue avec les données suivantes", {
				context: { id, title, description, content },
				request,
				trace: true,
				config: { minimalLogLevel: ArticleConfig.minimalLogLevel },
			});

			// Vérifier si au moins un champ a été fourni
			if (!title && !description && !content) {
				ResponseHandler.error(
					"❌ Aucun champ fourni pour modification",
					null,
					request,
				);
				return reply.status(HttpStatus.BAD_REQUEST).send({
					status: "error",
					message: "Aucun champ fourni pour modification",
				});
			}

			// Récupérer l'article existant
			const article = await articleService.getArticleById(id);
			if (!article) {
				ResponseHandler.error(
					`⚠️ Article avec l'ID ${id} introuvable.`,
					null,
					request,
				);
				return reply.status(HttpStatus.NOT_FOUND).send({
					status: "error",
					message: `Article avec l'ID ${id} introuvable.`,
				});
			}

			// Log pour le développement
			ResponseHandler.debug("🔄 Article avant mise à jour", {
				data: article,
				request,
				trace: ArticleConfig.TRACE,
			});
			// Mise à jour de l'article
			const updatedArticle = await articleService.updateArticleById(id, {
				title: title ?? article.title,
				description: description ?? article.description,
				content: content ?? article.content,
			});

			// Vérification après mise à jour
			const foundArticle = await articleService.getArticleById(id);
			if (!foundArticle) {
				// Log pour le développement
				ResponseHandler.error(
					"❌ Article introuvable après mise à jour.",
					null,
					request,
				);
				return reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
					status: "error",
					message: "Article introuvable après mise à jour.",
				});
			}
			ResponseHandler.debug("🔄 Article avant mise à jour", {
				data: article,
				request,
				trace: ArticleConfig.TRACE,
			});
			return reply.status(HttpStatus.OK).send({
				status: "success",
				message: `Article avec l'ID ${id} modifié avec succès.`,
				data: updatedArticle,
			});
		},
	);

	fastify.put<{ Body: { oldUserId: number | null; newUserId: number; pagination?: { page?: number, limit?: number } } }>(
		"/reassign",
		{
			preHandler: [isAuthenticated, isAdmin],
			schema: ArticleSchemas.ReassignArticles,
		},
		async (request, reply) => {
			console.log("Requête reçue :", request.body); // 🔍 DEBUG
			const { oldUserId, newUserId, pagination } = request.body;
			const page = pagination?.page ?? ArticleConfig.DEFAULT_PAGE;
			const limit = pagination?.limit ?? ArticleConfig.DEFAULT_LIMIT;
	
			console.log("🔄 Réassignation des articles avec pagination :", { oldUserId, newUserId, page, limit });
	
			const reassignedArticles = await articleService.reassignArticles(
				oldUserId ?? null,
				newUserId,
				page,
				limit
			);
	
			if (reassignedArticles.count === 0) {
				return reply.status(HttpStatus.OK).send({
					status: "info",
					message: "Aucun article à réattribuer.",
					count: 0,
					pagination: { page, limit },
					total: reassignedArticles.total,
				});
			}
	
			return reply.status(HttpStatus.OK).send({
				status: "success",
				message: `Articles réassignés avec succès à l'utilisateur ${newUserId}.`,
				count: reassignedArticles.count,
				pagination: { page, limit },
				total: reassignedArticles.total,
				articles: reassignedArticles.articles,
			});
		}
	);
	
	
}
