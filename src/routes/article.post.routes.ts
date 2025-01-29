import { FastifyInstance } from "fastify";
import { ArticleService } from "../services/article.service";
import { ResponseHandler } from "../utils/response.handler";
import { isAdmin } from "../middlewares/is-admin.middleware";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateArticleDTO } from "../dtos/create-article.dto";

const articleService = new ArticleService();

export async function articlePostRoutes(app: FastifyInstance) {
  app.post<{ Body: CreateArticleDTO }>(
    "/",
    {
      preHandler: async (request, reply) => {
        await request.jwtVerify(); // Vérifie le JWT
        isAdmin(request, reply); // Vérifie si l'utilisateur est admin
      },
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

        if (errors.length > 0) {
            for (const error of errors) {
                console.error(error);
            }

          return ResponseHandler.error(reply, "Validation échouée", 400);
        }

        // Création de l'article
        const { title, description, content } = dto;
        const createdById = request.user.id;
        const article = await articleService.createArticle(title, description, content, createdById);

        ResponseHandler.success(reply, article, "Article créé", 201);
      } catch (error) {
        ResponseHandler.error(reply, "Erreur lors de la création de l'article", 500);
      }
    }
  );
}
