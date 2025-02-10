import { FastifyInstance } from 'fastify';
import { ArticleController } from '../controllers/article.controller';
import { ResponseHandler } from '../utils/response.handler';
import { HttpStatus, HttpMessages } from '../config/http.config';
import { EnvironnementLevel } from '../config/environnement.config';
import { COLORS } from '../utils/colors.tui.utils';
export async function articleGetRoutes(fastify: FastifyInstance) {
    const articleController = new ArticleController();

    /**
     * Récupérer la liste des articles
     */
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

            const articles = await articleController.getAllArticles();

            if (process.env.NODE_ENV === EnvironnementLevel.DEVELOPMENT) {
                console.log(
                    COLORS.GREEN +
                        `@Route GET /articles : ${articles.length ? HttpMessages.SUCCESS : HttpMessages.NO_RESOURCES_FOUND}` +
                        COLORS.RESET,
                );
            }
            
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


    /**
     * Récupérer un article par son ID
     */
    fastify.get('/:id', {
        schema: {
            tags: ['Articles'],
            description: 'Récupérer un article par son ID',
            params: {
                type: 'object',
                properties: {
                    id: { type: 'integer', description: "ID de l'article" },
                },
            },
            response: {
                [HttpStatus.OK]: {
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
                [HttpStatus.NOT_FOUND]: {
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
            
            const id = Number((request.params as { id: string }).id);
            if (isNaN(id)) {
                return reply.status(400).send({ status: 'error', message: "ID invalide" });
            }
            const article = await articleController.getArticleById(id);
            if (!article) {
                if (process.env.NODE_ENV === EnvironnementLevel.DEVELOPMENT) {
                    console.log(
                        COLORS.RED +
                            `@Route GET /articles/${id} : Article avec l'ID ${id} introuvable.` +
                            COLORS.RESET,
                    );
                }
                
                return reply.status(404).send({
                    status: 'error',
                    message: `Article avec l'ID ${id} introuvable.`,
                });
            }
    
            ResponseHandler.success("Article récupéré avec succès.", article, request);
            return reply.send(article);
    
        } catch (error) {
            return ResponseHandler.error("Erreur lors de la récupération de l'article", error, request);
        }
    });
}    