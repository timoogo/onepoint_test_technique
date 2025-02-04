import { FastifyInstance } from 'fastify';
import { ArticleController } from '../controllers/article.controller';
import { ResponseHandler } from '../utils/response.handler';

export async function articleGetRoutes(fastify: FastifyInstance) {
    const articleController = new ArticleController();

    // Route GET /articles
    fastify.get('/', {
        preHandler: [], // Pas de prétraitement / middleware
        schema: {
            tags: ['Articles'], // Correction : "Articles" au pluriel pour une meilleure organisation Swagger
            description: 'Récupérer la liste des articles',
            security: [], // Pas de sécurité pour cette route
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            title: { type: 'string' },
                            description: { type: 'string' }, // Ajout de `description`
                            content: { type: 'string' },
                            createdAt: { type: 'string', format: 'date-time' },
                            updatedAt: { type: 'string', format: 'date-time' }, // Ajout d'`updatedAt`
                            createdById: { type: 'number', nullable: true }, // Correction
                        },
                    },
                },
            },
            
        },
    }, async (request, reply) => {
        try {
            console.log("GET * /articles");
            console.table(request.user);
            const articles = await articleController.getAllArticles();
            ResponseHandler.success("Liste des articles récupérée avec succès.", articles, request);
        } catch (error) {
            ResponseHandler.error("Erreur lors de la récupération des articles", error, request);}
    });

    // Route GET /articles/:id
    fastify.get('/:id', {
        schema: {
            tags: ['Articles'],
            description: 'Récupérer un article par son ID',
            params: {
                type: 'object',
                properties: {
                    id: { type: 'integer', description: "ID de l'article" }, // Correction: integer au lieu de string
                },
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        title: { type: 'string' },
                        description: { type: 'string' },
                        content: { type: 'string' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                        createdById: { type: 'number', nullable: true },
                    },
                },
                404: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        message: { type: 'string' },
                    },
                    description: "Article introuvable",
                },
            },
        },
    }, async (request, reply) => {
        try {
            const { id } = request.params as { id: number };
            const article = await articleController.getArticleById(id);

            if (!article) {
                return reply.status(404).send({
                    status: 'error',
                    message: `Article avec l'ID ${id} introuvable.`,
                });
            }

            ResponseHandler.success("Article récupéré avec succès.", article, request);
        } catch (error) {
            ResponseHandler.error("Erreur lors de la récupération de l'article", error, request);
        }
    });
}
