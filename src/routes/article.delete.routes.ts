import { FastifyInstance } from "fastify";
import { ArticleController } from "../controllers/article.controller";
import { isAdmin } from "../middlewares/is-admin.middleware";
import { isAuthenticated } from "../middlewares/is-authenticated.middleware";
import { ResponseHandler } from "../utils/response.handler";

export async function articleDeleteRoutes(fastify: FastifyInstance) {
	const articleController = new ArticleController();
	// Route GET /articles/:id
	fastify.delete<{ Params: { id: string }; Reply: any }>(
		"/:id",
		{
			preHandler: [isAuthenticated, isAdmin], // ✅ Vérifie l'authentification AVANT l'admin
			schema: {
				tags: ["Articles"],
				description: "Supprimer un Article par son ID",
				params: {
					type: "object",
					properties: {
						id: { type: "integer", description: "ID de l'Article" },
					},
					required: ["id"],
				},
				response: {
					200: {
						type: "object",
						properties: {
							id: { type: "number" },
							name: { type: "string" },
							email: { type: "string" },
							role: { type: "string" },
							createdAt: { type: "string", format: "date-time" },
							updatedAt: { type: "string", format: "date-time" },
						},
					},
					404: {
						description: "Article introuvable",
						type: "object",
						properties: {
							status: { type: "string" },
							message: { type: "string" },
						},
					},
				},
			},
		},
		async (request, reply) => {
			try {
				const { id } = request.params;
				const articleId = parseInt(id, 10);

                const article = await articleController.deleteArticleById(articleId);
				console.log("🚀 Article envoyé à ResponseHandler :", article);

				if (!article) {
					return reply.status(404).send({
						status: "error",
						message: `Article avec l'ID ${articleId} introuvable.`,
					});
				}

				return reply.status(200).send({
					status: "success",
					date: article.updatedAt,
					message: `Article avec l'ID ${articleId} supprimé avec succès.`,
					data: article,
				});
			} catch (error) {
				ResponseHandler.error(
					"Erreur lors de la récupération de l'Article",
					error,
					request,
				);
				return reply.status(500).send({
					status: "error",
					message: "Erreur interne du serveur",
				});
			}
		},
	);
}
