import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/user.controller';
import { ResponseHandler } from '../utils/response.handler';

export async function userGetAllRoutes(fastify: FastifyInstance) {
    const userController = new UserController();

    fastify.get('/users', async (request, reply) => {
        try {
            const users = await userController.getAllUsers();
            ResponseHandler.success(reply, users, 'Liste des utilisateurs récupérée avec succès.');
        } catch (error) {
            ResponseHandler.error(reply, error);
        }
    });
}

export async function userGetOneRoutes(fastify: FastifyInstance) {
    const userController = new UserController();
  
    fastify.get('/users/:id', async (request, reply) => {
      try {
        // Extraction de l'ID depuis les paramètres
        const { id } = request.params as { id: string };
  
        const user = await userController.getUserById(parseInt(id, 10));
        if (!user) {
          return reply.status(404).send({
            status: 'error',
            message: `Utilisateur avec l'ID ${id} introuvable.`,
          });
        }
  
        ResponseHandler.success(reply, user, `Utilisateur avec l'ID ${id} récupéré avec succès.`);
      } catch (error) {
        ResponseHandler.error(reply, error);
      }
    });
  }
  