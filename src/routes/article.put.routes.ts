import { FastifyInstance } from "fastify";
import { isAdmin } from "../middlewares/is-admin.middleware";
import { isAuthenticated } from "../middlewares/is-authenticated.middleware";
import { ArticleService } from "../services/article.service";
import { UserService } from "../services/user.service";
export async function articlePutRoutes(fastify: FastifyInstance) {
	const articleService = new ArticleService();
	const userService = new UserService();

	/**
	 * Route PUT /articles/:id
	 * Modifier un article (Admin seulement)
	 */
	fastify.put<{
		Params: { id: string };
		Body: { title?: string; description?: string; content?: string };
	}>(
		"/:id",
		{
			preHandler: [isAuthenticated, isAdmin], // ✅ Vérifie l'authentification AVANT l'admin

			schema: {
				summary: "Modifier un article",
				description: "Modifier un article par son ID (admin uniquement)",
				tags: ["Articles"],
				security: [{ BearerAuth: [] }],
				params: {
					type: "object",
					properties: {
						id: { type: "string", description: "ID de l'article" },
					},
				},
				body: {
					type: "object",
					properties: {
						title: { type: "string", description: "Titre de l'article" },
						description: { type: "string", description: "Brève description" },
						content: { type: "string", description: "Contenu de l'article" },
					},
				},
				response: {
					200: {
						description: "Article modifié avec succès",
						type: "object",
						properties: {
							id: { type: "number" },
							title: { type: "string" },
							description: { type: "string" },
							content: { type: "string" },
							createdAt: { type: "string", format: "date-time" },
							updatedAt: { type: "string", format: "date-time" },
							createdById: { type: "number" },
						},
					},
					400: { description: "Erreur de validation" },
					401: { description: "Non autorisé" },
					404: { description: "Article non trouvé" },
					500: { description: "Erreur serveur" },
				},
			},
		},
		async (request, reply) => {
			const { id } = request.params;
			const { title, description, content } = request.body;

			const article = await articleService.getArticleById(Number(id));
			if (!article) {
				return reply.status(404).send({ error: "Article not found" });
			}

			const updatedArticle = await articleService.updateArticleById(
				Number(id),
				{
					title,
					description,
					content,
				},
			);
			return reply.send(updatedArticle);
		},
	);

	fastify.put<{ Body: { oldUserId: number | null; newUserId: number } }>(
		"/reassign",
		{
			preHandler: [isAuthenticated, isAdmin], // ✅ Vérifie l'authentification AVANT l'admin

			schema: {
				summary: "Réattribuer les articles",
				description:
					"Réattribuer les articles d'un utilisateur supprimé ou dont les articles sont désassignés (admin uniquement)",
				tags: ["Articles"],
				security: [{ BearerAuth: [] }],
				body: {
					type: "object",
					required: ["newUserId"],
					properties: {
						oldUserId: {
							type: ["number", "null"],
							description: "ID de l'ancien utilisateur (ou null si désassigné)",
						},
						newUserId: {
							type: "number",
							description: "ID du nouvel utilisateur",
						},
					},
				},
				response: {
					200: {
						description: "Articles réattribués avec succès",
						type: "object",
						properties: {
							message: { type: "string" },
							count: { type: "number" },
						},
					},
					400: { description: "Erreur de validation" },
					401: { description: "Non autorisé" },
					404: { description: "Utilisateur non trouvé" },
					500: { description: "Erreur serveur" },
				},
			},
		},

		async (request, reply) => {
			const { oldUserId, newUserId } = request.body;

			if (oldUserId === null) {
				// Vérifier si des articles existent sans propriétaire
				const count = await articleService.countUnassignedArticles();
				if (count === 0) {
					return reply
						.status(404)
						.send({ error: "No unassigned articles found" });
				}
			} else {
				// Vérifier si l'ancien utilisateur existe
				const oldUser = await userService.getUserById(oldUserId);
				if (!oldUser) {
					return reply.status(404).send({ error: "Old user not found" });
				}
			}

			// Vérifier si le nouvel utilisateur existe
			const newUser = await userService.getUserById(newUserId);
			if (!newUser) {
				return reply.status(404).send({ error: "New user not found" });
			}

			// Réattribuer les articles
			const reassignedArticles = await articleService.reassignArticles(
				oldUserId ?? null, // Assure que null passe bien
				newUserId,
			);
			if (reassignedArticles.count === 0) {
				return reply
					.status(200)
					.send({ message: "No articles found to reassign" });
			}

			return reply.send({
				message: "Articles reassigned successfully",
				count: reassignedArticles.count,
			});
		},
	);
}
