import { FastifyInstance } from 'fastify';
import { articleGetRoutes } from './article.get.routes';
import { articlePostRoutes } from './article.post.routes';
import { ResponseHandler } from '../utils/response.handler';

export async function ArticleRoutes(app: FastifyInstance) {
    ResponseHandler.info('Enregistrement des routes liées aux articles...');

    // Routes GET (liste et article spécifique)
    app.register(articleGetRoutes, { prefix: '/articles' });

    // Routes POST (ajout d'un nouvel article)
    app.register(articlePostRoutes, { prefix: '/articles' });
}
