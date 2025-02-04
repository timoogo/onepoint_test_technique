import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { FastifyInstance } from "fastify";
import { EnvironnementLevel } from "../config/environnement.config";
import { CreateArticleDTO } from "../dtos/create-article.dto";
import { isAdmin } from "../middlewares/is-admin.middleware";
import { isAuthenticated } from "../middlewares/is-authenticated.middleware";
import { ArticleService } from "../services/article.service";
import { ResponseHandler } from "../utils/response.handler";

const articleService = new ArticleService();

export async function articlePostRoutes(app: FastifyInstance) {
	app.post<{ Body: CreateArticleDTO }>(
		"/",
		{
			preHandler: [isAuthenticated, isAdmin], // ✅ Vérifie l'authentification AVANT l'admin

			schema: {
				summary: "Créer un nouvel article",
				description: "Créer un nouvel article (admin uniquement)",
				tags: ["Articles"],
				security: [{ BearerAuth: [] }],
				body: {
					type: "object",
					required: ["title", "description", "content"],
					properties: {
						title: { type: "string", description: "Titre de l'article" },
						description: { type: "string", description: "Brève description" },
						content: { type: "string", description: "Contenu de l'article" },
					},
				},
				response: {
					201: {
						description: "Article créé avec succès",
						type: "object",
						properties: {
							message: { type: "string" },
							article: {
								type: "object",
								properties: {
									id: { type: "number" },
									title: { type: "string" },
									description: { type: "string" },
									content: { type: "string" },
									createdAt: { type: "string", format: "date-time" },
									createdBy: { type: "number" },
								},
							},
						},
					},
					400: { description: "Erreur de validation" },
					401: { description: "Non autorisé" },
					500: { description: "Erreur serveur" },
				},
			},
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

						ResponseHandler.error("Validation échouée", reply);
            return reply.status(400).send({
              status: "error",
              message: "Validation échouée",
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
					ResponseHandler.error(
						"Erreur lors de la création de l'article",
						reply,
					);
				}

				// Vérification de la longueur des champs
				if (article.description.length) ResponseHandler.success("La description est assez longue", article);
        if (article.content.length) ResponseHandler.success("Le contenu est assez long", article);

        // Réponse
        ResponseHandler.success("Article créé avec succès", article);
        return reply.status(201).send({
          message: "Article créé avec succès",
          article,
        });

			} catch (error) {
				ResponseHandler.error("Erreur lors de la création de l'article", error);
			}
		},
	);
}
