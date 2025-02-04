import { FastifyInstance } from 'fastify';
import { userPostRoutes } from './user.post.routes';
import { userGetRoutes } from './user.get.routes';
import { ResponseHandler } from '../utils/response.handler';
import { userDeleteRoutes } from './user.delete.routes';

export async function UserRoutes(app: FastifyInstance) {
  ResponseHandler.info('Enregistrement des routes utilisateur...');

  // Regroupement des routes sous "/users"
  app.register(userPostRoutes, { prefix: "/users" });
  app.register(userGetRoutes, { prefix: "/users" });
  app.register(userDeleteRoutes, { prefix: "/users" });
}