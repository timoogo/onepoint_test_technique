import { FastifyInstance } from "fastify";
import { HttpMessages, HttpStatus } from "../config/http.config";
import { UserConfig } from "../config/user.config";
import { UserController } from "../controllers/user.controller";
import { isAdmin } from "../middlewares/is-admin.middleware";
import { isAuthenticated } from "../middlewares/is-authenticated.middleware";
import { UserSchemas } from "../schemas/user.schemas";
import { ResponseHandler } from "../utils/response.handler";
import { UserService } from "../services/user.service";

export async function userGetRoutes(fastify: FastifyInstance) {
	const userController = new UserController();
	const userService = new UserService();
	// Route GET /users
	fastify.get<{ Querystring: { page?: number; limit?: number }; Reply: any }>(
		"/",
		{
			preHandler: [isAuthenticated, isAdmin], // ✅ Vérifie l'authentification AVANT l'admin
			schema: UserSchemas.GetAllUsers,
		},
		async (request, reply) => {
			const page = request.query.page ?? UserConfig.PaginationConfig.DEFAULT_PAGE;
			const limit = Math.min(request.query.limit ?? UserConfig.PaginationConfig.DEFAULT_LIMIT, UserConfig.PaginationConfig.PAGE_MAX_LIMIT);
			const offset = (page - 1) * limit;

			try {
		
				const users = await userController.getPaginatedUsers(limit, offset);
				const total = await userService.countUsers();

					if (!users || users.length === 0) {
						console.log("No users found");
					return reply.status(HttpStatus.OK).send({
						status: "success",
						message: {
							state: HttpMessages.NO_RESOURCES_FOUND,
							details: "No users found",
						},
						page,
						limit,
						total,
						data: [],
					});

				}

				return reply.status(HttpStatus.OK).send({
					status: "success",
					message: {
						state: HttpMessages.SUCCESS,
						details: "Users fetched successfully",
					},
					page,
					limit,
					total,
					data: [...users],
				});

				


			} catch (error) {
				console.error("Error fetching users", error);
			}
		},
	);

	// Route GET /users/:id
	fastify.get<{ Params: { id: string }; Reply: any }>(
		"/:id",
		{
			preHandler: [isAuthenticated, isAdmin], 
			schema: UserSchemas.GetUserById,
		},
		async (request, reply) => {
			try {
				const id = Number(request.params.id);
				if (isNaN(id)) {
					console.warn("Invalid ID received :", request.params.id);
					return reply.status(HttpStatus.BAD_REQUEST).send({
						status: "error",
						message: "Invalid ID",
					});
				}
				const user = await userController.getUserById(id);

				if (!user) {
					console.warn(`User with ID ${id} not found.`);
					return reply.status(HttpStatus.NOT_FOUND).send({
						status: "error",
						message: `User with ID ${id} not found.`,
					});
				}


				const response = {
					status: "success",
					message: `User with ID ${id} fetched successfully.`,
					data: user,
				};
				return reply.status(HttpStatus.OK).send(response);
			} catch (error) {
				console.error(
					"Error fetching user :",
					error,
				);
				return reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
					status: "error",
					message: "Internal server error",
				});
			}
		},
	);
}
