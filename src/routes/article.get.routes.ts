import { FastifyInstance } from "fastify";
import { ArticleConfig } from "../config/article.config";
import { HttpMessages, HttpStatus } from "../config/http.config";
import { ArticleController } from "../controllers/article.controller";
import { ArticleSchemas } from "../schemas/article.schema";
import { ResponseHandler } from "../utils/response.handler";
export async function articleGetRoutes(fastify: FastifyInstance) {
	const articleController = new ArticleController();

	/**
	 * Récupérer la liste des articles
	 */
	fastify.get<{
		Querystring: { page?: number; limit?: number };
	}>(
		"/",
		{
			schema: ArticleSchemas.GetAllArticles,
		},
		async (request, reply) => {
			const page = request.query.page ?? ArticleConfig.DEFAULT_PAGE;
			const limit = Math.min(
				request.query.limit ?? ArticleConfig.DEFAULT_LIMIT,
				ArticleConfig.PAGE_MAX_LIMIT,
			);
			const offset = (page - 1) * limit;
			const context = request.query;

			try {
				const { articles, total } =
					await articleController.getPaginatedArticles(limit, offset);

				if (!articles || articles.length === 0) {
					console.error("No articles found");
					return reply.status(HttpStatus.OK).send({
						status: "success",
						message: {
							state: HttpMessages.NO_RESOURCES_FOUND,
							details: "Aucun article trouvé",
						},
						page,
						limit,
						total, // ✅ Ajout du total dans la réponse
						data: [],
					});
				}

				return reply.status(HttpStatus.OK).send({
					status: "success",
					message: {
						state: HttpMessages.RESOURCES_FOUND,
						details: "Articles récupérés avec succès",
					},
					page,
					limit,
					total, // ✅ Ajout du total dans la réponse
					data: articles,
				});
			} catch (error) {
				console.error("Error fetching articles", error);
				return reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
					status: "error",
					message: HttpMessages.INTERNAL_SERVER_ERROR,
				});
			}
		},
	);

	/**
	 * Récupérer un article par son ID
	 */
	fastify.get<{
		Params: { id: number };
	}>(
		"/:id",
		{
			schema: ArticleSchemas.GetArticleById,
		},
		async (request, reply) => {
			const { id } = request.params; // ✅ Correction : Type `id` bien défini

			try {
				const article = await articleController.getArticleById(id);

				if (!article) {
					console.error("Article not found");
					return reply.status(HttpStatus.NOT_FOUND).send({
						status: "error",
						message: {
							state: HttpMessages.NO_RESOURCES_FOUND, // ✅ Correction ici
							details: `No article found with ID ${id}`,
						},
					});
				}

				return reply.status(HttpStatus.OK).send({
					status: "success",
					message: {
						state: HttpMessages.RESOURCES_FOUND, // ✅ Correction ici
						details: `Article with ID ${id} fetched successfully`,
					},
					data: article,
				});
			} catch (error) {
				console.error("Error fetching article", error);

				return reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
					status: "error",
					message: HttpMessages.INTERNAL_SERVER_ERROR,
				});
			}
		},
	);
}
