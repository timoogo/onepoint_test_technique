import { FastifyInstance } from "fastify";
import { HttpStatus } from "../config/http.config";
import { ArticleController } from "../controllers/article.controller";
import { isAdmin } from "../middlewares/is-admin.middleware";
import { isAuthenticated } from "../middlewares/is-authenticated.middleware";
import { ResponseHandler } from "../utils/response.handler";
import { ArticleSchemas } from "../schemas/article.schema";

/**
 * Route DELETE /articles/:id
 * Supprimer un article (Admin seulement)
 */
export async function articleDeleteRoutes(fastify: FastifyInstance) {
	const articleController = new ArticleController();

	fastify.delete<{ Params: { id: number }; Reply: any }>(
		"/:id",
		{
			preHandler: [isAuthenticated, isAdmin], // Vérifie l'authentification AVANT l'admin
			schema: ArticleSchemas.DeleteArticle,
		},
		async (request, reply) => {
			try {
				const { id } = request.params;

				const deletedArticle = await articleController.deleteArticleById(id);

				if (!deletedArticle) {
					return reply.status(HttpStatus.NOT_FOUND).send({
						status: "error",
						message: `Article with ID ${id} not found.`,
					});
				}

				return reply.status(HttpStatus.OK).send({
					status: "success",
					date: deletedArticle.updatedAt,
					message: {
						state: "Article deleted",
						details: `Article with ID ${id} deleted successfully.`,
					},
					data: deletedArticle,
				});
			} catch (error) {
				ResponseHandler.error(
					"Error deleting the article",
					error,
					request
				);
				return reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
					status: "error",
					message: "Internal server error",
				});
			}
		}
	);
}