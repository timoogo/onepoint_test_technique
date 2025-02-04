import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/user.controller';
import { ResponseHandler } from '../utils/response.handler';
import { isAdmin } from '../middlewares/is-admin.middleware';
import { isAuthenticated } from '../middlewares/is-authenticated.middleware';

export async function userDeleteRoutes(fastify: FastifyInstance) {
    const userController = new UserController();
    // Route GET /users/:id
    fastify.delete<{ Params: { id: string }; Reply: any }>('/:id', {
      preHandler: [isAuthenticated, isAdmin], // ✅ Vérifie l'authentification AVANT l'admin
        schema: {
            tags: ['Users'],
            description: 'Supprimer un utilisateur par son ID',
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
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
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

            const user = await userController.deleteUserById(userId);
            console.log("🚀 Utilisateur envoyé à ResponseHandler :", user);

            if (!user) {
                return reply.status(404).send({
                    status: 'error',
                    message: `Utilisateur avec l'ID ${userId} introuvable.`,
                });
            }



            return reply.status(200).send({
                status: 'success',
                date: user.updatedAt,
                message: `Utilisateur avec l'ID ${userId} supprimé avec succès.`,
                data: user,
            });
        } catch (error) {
            ResponseHandler.error("Erreur lors de la récupération de l'utilisateur", error, request);
            return reply.status(500).send({
                status: 'error',
                message: 'Erreur interne du serveur',
            });
        }
    });
}
