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


			console.log("🔍 Requête reçue avec les paramètres suivants", {
				query: request.query,
				user: request.user,
				body: request.body,
				headers: request.headers,
				raw: request.raw,
				server: request.server,
				hostname: request.hostname,
				ip: request.ip,
				ips: request.ips,
			});
			const page = request.query.page ?? UserConfig.DEFAULT_PAGE;
			const limit = Math.min(request.query.limit ?? UserConfig.DEFAULT_LIMIT, UserConfig.PAGE_MAX_LIMIT);
			const offset = (page - 1) * limit;
			const context = request.query;

			try {
				ResponseHandler.info(
					"🔍 Récupération des utilisateurs",
					null,
					request,
					{ minimalLogLevel: UserConfig.minimalLogLevel },
				);

				const users = await userController.getPaginatedUsers(limit, offset);
				const total = await userService.countUsers();

				if (!users || users.length === 0) {
					ResponseHandler.info("⚠️ Aucun utilisateur trouvé", null, request);
					return reply.status(HttpStatus.OK).send({
						status: "success",
						message: {
							state: HttpMessages.NO_RESOURCES_FOUND,
							details: "Aucun utilisateur trouvé",
						},
						page,
						limit,
						total,
						data: [],
					});

				}

				ResponseHandler.success("✅ Utilisateurs récupérés avec succès", { page, limit, total, data: users }, request);

				return reply.status(HttpStatus.OK).send({
					status: "success",
					message: {
						state: HttpMessages.SUCCESS,
						details: "Utilisateurs récupérés avec succès",
					},
					page,
					limit,
					total,
					data: [...users],
				});

				


			} catch (error) {
				ResponseHandler.debug("📌 Requête reçue avec les paramètres suivants", {
					context: {
						// page, limit
					},
					request,
					trace: true,
					config: { minimalLogLevel: UserConfig.minimalLogLevel },
				});
			}
		},
	);

	// Route GET /users/:id
	fastify.get<{ Params: { id: string }; Reply: any }>(
		"/:id",
		{
			preHandler: [isAuthenticated, isAdmin], // ✅ Vérifie d'abord l'authentification puis l'admin
			schema: UserSchemas.GetUserById,
		},
		async (request, reply) => {
			try {
				console.log("authorisé ?", request.user);
				console.log("🟢 Requête reçue pour /users/:id", {
					params: request.params,
					user: request.user,
				});

				// ✅ Vérification et conversion de l'ID
				const id = Number(request.params.id);
				if (isNaN(id)) {
					console.warn("⚠️ ID invalide reçu :", request.params.id);
					return reply.status(400).send({
						status: "error",
						message: "ID invalide",
					});
				}

				console.log("🔍 Recherche de l'utilisateur avec ID :", id);

				// ✅ Récupération de l'utilisateur
				const user = await userController.getUserById(id);

				// ✅ Vérification de l'existence de l'utilisateur
				if (!user) {
					console.warn(`⚠️ Aucun utilisateur trouvé avec l'ID ${id}`);
					return reply.status(404).send({
						status: "error",
						message: `Utilisateur avec l'ID ${id} introuvable.`,
					});
				}

				console.log("🚀 Utilisateur trouvé :", user);

				// ✅ Construction de la réponse finale
				const response = {
					status: "success",
					message: `Utilisateur avec l'ID ${id} récupéré avec succès.`,
					data: user,
				};

				console.log("📤 Réponse finale envoyée :", response);

				return reply.status(HttpStatus.OK).send(response);
			} catch (error) {
				console.error(
					"❌ Erreur lors de la récupération de l'utilisateur :",
					error,
				);
				return reply.status(500).send({
					status: "error",
					message: "Erreur interne du serveur",
				});
			}
		},
	);
}
