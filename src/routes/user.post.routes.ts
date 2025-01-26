import { FastifyInstance } from 'fastify';
import { userModel } from '../models/user.models';
import { registerUser } from '../controllers/user.controller';

export async function userPostRoutes(fastify: FastifyInstance) {
  fastify.post('/users', {
    schema: {
      summary: 'Créer un nouvel utilisateur',
      tags: ['Users'],
      body: userModel,
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
