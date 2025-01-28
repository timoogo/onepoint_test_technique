import { FastifyInstance } from 'fastify';
import { userPostRoutes } from './user.post.routes';
import { userGetAllRoutes } from './user.get.routes';
import { userGetOneRoutes } from './user.get.routes';
import { ResponseHandler } from '../utils/response.handler';

export async function UserRoutes(app: FastifyInstance) {
  ResponseHandler.info('Enregistrement des routes utilisateur...');
  // Ajoute POST
  ResponseHandler.info('Enregistrement de la route POST /users');
  app.register(userPostRoutes, { prefix: '/users' }); // Enregistre les routes POST sous le préfixe "/users"

  // Ajoute GET
  ResponseHandler.info('Enregistrement de la route GET /users');
  app.register(userGetAllRoutes, { prefix: '/users' });  // Enregistre les routes GET sous le même préfixe

  // Ajoute GET by ID
  ResponseHandler.info('Enregistrement de la route GET /users/:id');
  app.register(userGetOneRoutes, { prefix: '/users' });  // Enregistre les routes GET sous le même préfixe
}
