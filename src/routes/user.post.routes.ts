import { FastifyInstance } from 'fastify';
import { userSchema } from '../schemas/user.schema';
import { registerUser } from '../controllers/user.controller';

export async function userPostRoutes(fastify: FastifyInstance) {
  fastify.post('/users', {
    schema: {
      summary: 'Créer un nouvel utilisateur',
      tags: ['Users'],
      body: userSchema,
      response: {
        201: {
          description: 'Utilisateur créé avec succès',
          type: 'object',
          properties: {
            id: { type: 'integer' },
            email: { type: 'string' },
            name: { type: 'string' },
            role: { type: 'string' },
          },
        },
      },
    },
  }, registerUser);
}
