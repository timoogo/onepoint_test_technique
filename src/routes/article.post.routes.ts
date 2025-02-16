import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { FastifyInstance } from "fastify";
import { EnvironnementLevel } from "../config/environnement.config";
import { HttpStatus } from "../config/http.config";
import { CreateArticleDTO } from "../dtos/create-article.dto";
import { isAdmin } from "../middlewares/is-admin.middleware";
import { isAuthenticated } from "../middlewares/is-authenticated.middleware";
import { ArticleSchemas } from "../schemas/article.schema";
import { ArticleService } from "../services/article.service";
const articleService = new ArticleService();

/**
 * Route POST /articles
 * Créer un nouvel article (admin uniquement)
 */
export async function articlePostRoutes(app: FastifyInstance) {
	app.post<{ Body: CreateArticleDTO }>(
		"/",
		{
			preHandler: [isAuthenticated, isAdmin], // ✅ Vérifie l'authentification AVANT l'admin
			schema: ArticleSchemas.CreateArticle,
		},
		async (request, reply) => {
			try {
				// Transformation et validation des données
				const dto = plainToInstance(CreateArticleDTO, request.body);
				const errors = await validate(dto);

				if (
					process.env.ENVIRONNEMENT_LEVEL === EnvironnementLevel.DEVELOPMENT
				) {
					if (errors.length > 0) {
						for (const error of errors) {
							console.error(error);
						}
						console.error("Validation failed", ...errors);
						return reply.status(HttpStatus.BAD_REQUEST).send({
							status: "error",
							message: "Validation failed",
							errors: errors.map((error) => ({
								property: error.property,
								constraints: error.constraints,
							})),
						});
					}
				}

				// Création de l'article
				const { title, description, content } = dto;
				const createdById = request.user.id;
				const article = await articleService.createArticle(
					title,
					description,
					content,
					createdById,
				);

				// Vérification de la création
				if (!article) {
					console.error("Error creating article", reply);
					// TODO: Voir si on peut améliorer cette erreur
				}

				// Réponse
				console.log("Successfully created article", article);
				return reply.status(HttpStatus.CREATED).send({
					status: "success",
					message: {
						state: "Resource created.",
						details: "Successfully created article",
					},
					data: {
						id: article.id,
						title: article.title,
						description: article.description,
						content: article.content,
						createdAt: article.createdAt,
						updatedAt: article.updatedAt,
						createdById: article.createdById,
					},
				});
			} catch (error) {
				console.error("Error creating article", error);
			}
		},
	);
}
