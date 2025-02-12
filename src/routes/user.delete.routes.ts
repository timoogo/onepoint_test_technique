import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/user.controller';
import { ResponseHandler } from '../utils/response.handler';
import { isAdmin } from '../middlewares/is-admin.middleware';
import { isAuthenticated } from '../middlewares/is-authenticated.middleware';
import { UserSchemas } from '../schemas/user.schemas';
import { HttpStatus } from '../config/http.config';

export async function userDeleteRoutes(fastify: FastifyInstance) {
    const userController = new UserController();
    // Route GET /users/:id
    fastify.delete<{ Params: { id: string }; Reply: any }>('/:id', {
        preHandler: [isAuthenticated, isAdmin],
        schema: UserSchemas.DeleteUser,
    }, async (request, reply) => {
        try {
            const { id } = request.params;
            const userId = parseInt(id, 10);
    
            const user = await userController.deleteUserById(userId);
            console.log("🚀 Utilisateur supprimé :", user);
    
            if (!user) {
                return reply.status(HttpStatus.NOT_FOUND).send({
                    status: 'error',
                    message: `Utilisateur avec l'ID ${userId} introuvable.`,
                });
            }
    
            return reply.status(HttpStatus.OK).send({
                status: 'success',
                message: `Utilisateur avec l'ID ${userId} supprimé avec succès.`,
                data: user,
            });
        } catch (error) {
            ResponseHandler.error("Erreur lors de la suppression de l'utilisateur", error, request);
            return reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                status: 'error',
                message: 'Erreur interne du serveur',
            });
        }
    });
    
}
