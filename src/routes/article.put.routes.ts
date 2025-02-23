import { FastifyInstance } from "fastify";
import { ArticleConfig } from "../config/article.config";
import { HttpStatus } from "../config/http.config";
import { isAdmin } from "../middlewares/is-admin.middleware";
import { isAuthenticated } from "../middlewares/is-authenticated.middleware";
import { ArticleSchemas } from "../schemas/article.schema";
import { ArticleService } from "../services/article.service";
import { UserService } from "../services/user.service";
import { ExampleGenerator } from "../utils/example.generator.utils";
import { ResponseHandler } from "../utils/response.handler";

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
			preHandler: [isAuthenticated, isAdmin],
			schema: ArticleSchemas.UpdateArticle,
		},
		async (request, reply) => {
			const { id } = request.params;
			const { title, description, content } = request.body;

			// Vérifier si au moins un champ a été fourni
			if (!title && !description && !content) {
				return reply.status(HttpStatus.BAD_REQUEST).send({
					status: "error",
					message: "No fields provided for modification",
				});
			}

			// Récupérer l'article existant
			const article = await articleService.getArticleById(id);
			if (!article) {
				ResponseHandler.error(
					`⚠️ Article with ID ${id} not found.`,
					null,
					request,
				);
				return reply.status(HttpStatus.NOT_FOUND).send({
					status: "error",
					message: `Article with ID ${id} not found.`,
				});
			}
			// Mise à jour de l'article
			const updatedArticle = await articleService.updateArticleById(id, {
				title: title ?? article.title,
				description: description ?? article.description,
				content: content ?? article.content,
			});

			// Vérification après mise à jour
			const foundArticle = await articleService.getArticleById(id);

			if (!foundArticle) {
				return reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
					status: "error",
					message: "Article not found after update.",
				});
			}

			return reply.status(HttpStatus.OK).send({
				status: "success",
				message: `Article with ID ${id} updated successfully.`,
				data: updatedArticle,
			});
		},
	);

	fastify.put<{
		Body: {
			oldUserId: number | null;
			newUserId: number;
			pagination?: { page?: number; limit?: number };
		};
	}>(
		"/reassign",
		{
			preHandler: [isAuthenticated, isAdmin],
			schema: ArticleSchemas.ReassignArticles,
		},
		async (request, reply) => {
			const { oldUserId, newUserId, pagination } = request.body;
			const page = pagination?.page ?? ArticleConfig.DEFAULT_PAGE;
			const limit = pagination?.limit ?? ArticleConfig.DEFAULT_LIMIT;

			const reassignedArticles = await articleService.reassignArticles(
				oldUserId ?? null,
				newUserId,
				page,
				limit,
			);

			if (reassignedArticles.count === 0) {
				return reply.status(HttpStatus.OK).send({
					status: "info",
					message: "No articles to reassign.",
					count: 0,
					pagination: { page, limit },
					total: reassignedArticles.total,
				});
			}

			return reply.status(HttpStatus.OK).send({
				status: "success",
				message: `Articles reassigned successfully to user ${newUserId}.`,
				count: reassignedArticles.count,
				pagination: { page, limit },
				total: reassignedArticles.total,
				articles: reassignedArticles.articles,
			});
		},
	);
}
