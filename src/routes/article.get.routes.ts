import { FastifyInstance } from 'fastify';
import { ArticleController } from '../controllers/article.controller';
import { ResponseHandler } from '../utils/response.handler';
import { HttpStatus, HttpMessages } from '../config/http.config';
export async function articleGetRoutes(fastify: FastifyInstance) {
    const articleController = new ArticleController();

    // Route GET /articles
    fastify.get('/', {
        schema: {
            tags: ['Articles'],
            description: 'Récupérer la liste des articles',
            security: [],
            response: {
                200: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        message: { type: 'string' },
                        data: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'integer' },
                                    title: { type: 'string' },
                                    description: { type: 'string' },
                                    content: { type: 'string' },
                                    createdAt: { type: 'string', format: 'date-time' },
                                    updatedAt: { type: 'string', format: 'date-time' },
                                    createdById: { type: ['integer', 'null'] },
                                    createdBy: {
                                        type: ['object', 'null'],
                                        nullable: true,
                                        properties: {
                                            id: { type: 'integer' },
                                            name: { type: 'string' },
                                            email: { type: 'string' },
                                        },
                                    },
                                },
                            },
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

            console.log("📤 Données envoyées :", JSON.stringify(articles, null, 2));

            return reply.status(HttpStatus.OK).send({
                status: "success",
                message: articles.length ? HttpMessages.SUCCESS : HttpMessages.NO_RESOURCES_FOUND,
                data: articles,
            });

        } catch (error) {
            ResponseHandler.error(HttpMessages.INTERNAL_SERVER_ERROR, error, request);
            return reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                status: "error",
                message: HttpMessages.INTERNAL_SERVER_ERROR,
            });
        }
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
