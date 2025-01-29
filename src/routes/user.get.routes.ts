import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/user.controller';
import { ResponseHandler } from '../utils/response.handler';

export async function userGetRoutes(fastify: FastifyInstance) {
    const userController = new UserController();

    // Route GET /users
    fastify.get('/', {
      schema: {
        tags: ['Users'], // Cette ligne associe la route à la section "User"
        description: 'Récupérer la liste des utilisateurs',
        response: {
          200: {
            type: 'object', // 🔥 Swagger attend un objet et non un tableau directement
            properties: {
              status: { type: 'string' },
              message: { type: 'string' },
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number' },
                    name: { type: 'string' },
                    email: { type: 'string' },
                    role: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    }, async (request, reply) => {
        try {
            const users = await userController.getAllUsers();
            ResponseHandler.success(reply, users, 'Liste des utilisateurs récupérée avec succès.');
        } catch (error) {
            ResponseHandler.error(reply, error);
        }
    });

    // Route GET /users/:id
    fastify.get<{ Params: { id: string } }>('/:id', {
      schema: {
        tags: ['Users'],
        description: 'Récupérer un utilisateur par son ID',
        params: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: "ID de l'utilisateur" },
          },
          required: ['id'],
        },
        response: {
          200: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              email: { type: 'string' },
              role: { type: 'string' },
              createdAt: { type: 'string', format: 'date-time' }, // ✅ Ajout de createdAt
              updatedAt: { type: 'string', format: 'date-time' }, // ✅ Ajout de updatedAt
            },
          },
          404: {
            description: "Utilisateur introuvable",
            type: "object",
            properties: {
              status: { type: "string" },
              message: { type: "string" },
            },
          },
        },
      },
    }, async (request, reply) => {
      try {
        const { id } = request.params;
        const userId = parseInt(id, 10);
    
        const user = await userController.getUserById(userId);
        console.log("🚀 Utilisateur envoyé à ResponseHandler :", user);
    
        if (!user) {
          return reply.status(404).send({
            status: 'error',
            message: `Utilisateur avec l'ID ${userId} introuvable.`,
          });
        }
    
        ResponseHandler.success(reply, user, `Utilisateur avec l'ID ${userId} récupéré avec succès.`);
      } catch (error) {
        ResponseHandler.error(reply, error);
      }
    });
    
    
}
