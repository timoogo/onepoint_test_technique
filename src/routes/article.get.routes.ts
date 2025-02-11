import { FastifyInstance } from "fastify";
import { ArticleConfig, ArticleSchemas } from "../config/article.config";
import { EnvironnementLevel } from "../config/environnement.config";
import { HttpMessages, HttpStatus } from "../config/http.config";
import { ArticleController } from "../controllers/article.controller";
import { COLORS } from "../utils/colors.tui.utils";
import { ResponseHandler } from "../utils/response.handler";
import { count } from "console";
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
            const limit = Math.min(request.query.limit ?? ArticleConfig.DEFAULT_LIMIT, ArticleConfig.MAX_LIMIT);
            const offset = (page - 1) * limit;
            const context = request.query;
            
            try {
                ResponseHandler.info("🔍 Récupération des articles", null, request, { minimalLogLevel: ArticleConfig.minimalLogLevel });
    
                ResponseHandler.debug("📌 Requête reçue avec les paramètres suivants", {
                    context: { page, limit },
                    request,
                    trace: true,
                    config: { minimalLogLevel: ArticleConfig.minimalLogLevel },
                });
    
                const { articles, total } = await articleController.getPaginatedArticles(limit, offset);
    
                if (!articles || articles.length === 0) {
                    ResponseHandler.info("⚠️ Aucun article trouvé", null, request);
    
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
    
                ResponseHandler.success("✅ Articles récupérés avec succès", { page, limit, total, data: articles }, request);
    
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
                ResponseHandler.error("❌ Erreur lors de la récupération des articles", error, request);
    
                return reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                    status: "error",
                    message: HttpMessages.INTERNAL_SERVER_ERROR,
                });
            }
        }
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
                ResponseHandler.info("🔍 Récupération de l'article par ID", null, request, { minimalLogLevel: ArticleConfig.minimalLogLevel });
    
                ResponseHandler.debug("📌 Requête reçue avec l'ID suivant", {
                    context: { id },
                    request,
                    trace: true,
                    config: { minimalLogLevel: ArticleConfig.minimalLogLevel },
                });
    
                const article = await articleController.getArticleById(id);
    
                if (!article) {
                    ResponseHandler.info("⚠️ Article non trouvé", null, request);
                    return reply.status(HttpStatus.NOT_FOUND).send({
                        status: "error",
                        message: {
                            state: HttpMessages.NO_RESOURCES_FOUND, // ✅ Correction ici
                            details: `Aucun article trouvé avec l'ID ${id}`,
                        },
                    });
                }
    
                ResponseHandler.success("✅ Article récupéré avec succès", article, request);
    
                return reply.status(HttpStatus.OK).send({
                    status: "success",
                    message: {
                        state: HttpMessages.RESOURCES_FOUND, // ✅ Correction ici
                        details: "Article récupéré avec succès",
                    },
                    data: article,
                });
    
            } catch (error) {
                ResponseHandler.error("❌ Erreur lors de la récupération de l'article", error, request);
    
                return reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                    status: "error",
                    message: HttpMessages.INTERNAL_SERVER_ERROR,
                });
            }
        }
    );
    
}
