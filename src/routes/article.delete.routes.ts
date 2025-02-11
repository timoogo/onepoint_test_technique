import { FastifyInstance } from "fastify";
import { ArticleSchemas } from "../config/article.config";
import { HttpStatus } from "../config/http.config";
import { ArticleController } from "../controllers/article.controller";
import { isAdmin } from "../middlewares/is-admin.middleware";
import { isAuthenticated } from "../middlewares/is-authenticated.middleware";
import { ResponseHandler } from "../utils/response.handler";

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
						message: `Article avec l'ID ${id} introuvable.`,
					});
				}

				return reply.status(HttpStatus.OK).send({
					status: "success",
					date: deletedArticle.updatedAt,
					message: `Article avec l'ID ${id} supprimé avec succès.`,
					data: deletedArticle,
				});
			} catch (error) {
				ResponseHandler.error(
					"Erreur lors de la suppression de l'Article",
					error,
					request
				);
				return reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
					status: "error",
					message: "Erreur interne du serveur",
				});
			}
		}
	);
}