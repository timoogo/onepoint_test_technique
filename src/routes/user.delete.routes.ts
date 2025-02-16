import { FastifyInstance } from "fastify";
import { HttpStatus } from "../config/http.config";
import { UserController } from "../controllers/user.controller";
import { isAdmin } from "../middlewares/is-admin.middleware";
import { isAuthenticated } from "../middlewares/is-authenticated.middleware";
import { UserSchemas } from "../schemas/user.schemas";

export async function userDeleteRoutes(fastify: FastifyInstance) {
	const userController = new UserController();
	// Route GET /users/:id
	fastify.delete<{ Params: { id: string }; Reply: any }>(
		"/:id",
		{
			preHandler: [isAuthenticated, isAdmin],
			schema: UserSchemas.DeleteUser,
		},
		async (request, reply) => {
			try {
				const { id } = request.params;
				const userId = parseInt(id, 10);

				const user = await userController.deleteUserById(userId);

				if (!user) {
					return reply.status(HttpStatus.NOT_FOUND).send({
						status: "error",
						message: `User with ID ${userId} not found.`,
					});
				}

				return reply.status(HttpStatus.OK).send({
					status: "success",
					message: `User with ID ${userId} deleted successfully.`,
					data: user,
				});
			} catch (error) {
				return reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
					status: "error",
					message: "Internal server error",
				});
			}
		},
	);
}
