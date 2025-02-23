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
	
				// Vérifier si l'ID est un nombre valide et positif
				if (isNaN(id) || id <= 0 || !Number.isInteger(id)) {
					console.warn("Invalid ID received:", request.params.id);
					return reply.status(HttpStatus.BAD_REQUEST).send({
						status: "error",
						message: {
							state: "Invalid request",
							details: `ID '${request.params.id}' is not a valid positive integer.`,
						},
					});
				}
	
				// Sécuriser l'appel pour éviter une erreur fatale
				let user;
				try {
					user = await userController.getUserById(id);
				} catch (error) {
					console.error(`Database error while fetching user with ID ${id}:`, error);
					return reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
						status: "error",
						message: {
							state: "Database error",
							details: "An error occurred while querying the database.",
						},
					});
				}
	
				// Vérifier si l'utilisateur existe
				if (!user) {
					console.warn(`User with ID ${id} not found.`);
					return reply.status(HttpStatus.NOT_FOUND).send({
						status: "error",
						message: {
							state: "User not found",
							details: `No user found with ID ${id}.`,
						},
					});
				}
	
				// Réponse en cas de succès
				return reply.status(HttpStatus.OK).send({
					status: "success",
					message: {
						state: "User retrieved",
						details: `User with ID ${id} fetched successfully.`,
					},
					data: user,
				});
				
			} catch (error) {
				console.error("Unexpected error fetching user:", error);
				return reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
					status: "error",
					message: {
						state: "Internal server error",
						details: "An unexpected error occurred while retrieving the user.",
					},
				});
			}
		},
	);
	
	
}
