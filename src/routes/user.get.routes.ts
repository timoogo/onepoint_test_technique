import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/user.controller";
import { isAdmin } from "../middlewares/is-admin.middleware";
import { isAuthenticated } from "../middlewares/is-authenticated.middleware";
import { ResponseHandler } from "../utils/response.handler";
import { HttpStatus } from "../config/http.config";
export async function userGetRoutes(fastify: FastifyInstance) {
	const userController = new UserController();

	// Route GET /users
	fastify.get<{ Reply: any }>(
		"/",
		{
			preHandler: [isAuthenticated, isAdmin], // ✅ Vérifie l'authentification AVANT l'admin
			schema: {
				tags: ["Users"],
				security: [{ BearerAuth: [] }], // 🔥 Swagger sait qu'il doit envoyer un token
				description: "Récupérer la liste des utilisateurs",
				response: {
					[HttpStatus.OK]: {
						type: "object",
						properties: {
							status: { type: "string" },
							message: { type: "string" },
							data: {
								type: "array",
								items: {
									type: "object",
									properties: {
										id: { type: "number" },
										name: { type: "string" },
										email: { type: "string" },
										role: { type: "string" },
									},
								},
							},
						},
					},
					[HttpStatus.UNAUTHORIZED]: {
						type: "object",
						properties: {
							status: { type: "string" },
							message: { type: "string" },
						},
					},
					[HttpStatus.FORBIDDEN]: {
						type: "object",
						properties: {
							status: { type: "string" },
							message: { type: "string" },
							data: {
								type: "object",
								properties: {
									status: { type: "string" },
									message: { type: "string" },
									type: { type: "string" },
									details: { type: "string" },
									stack: { type: "string" },
								},
							},
						},
					},
				},
			},
		},
		async (request, reply) => {
			try {
				ResponseHandler.info(
					"Récupération de la liste des utilisateurs",
					null,
					request,
				);
				const users = await userController.getAllUsers();
				return reply.status(200).send({
					status: "success",
					message: "Liste des utilisateurs récupérée avec succès.",
					data: users,
				});
			} catch (error) {
				ResponseHandler.error(
					"Erreur lors de la récupération des utilisateurs",
					error,
					request,
				);
				return reply.status(500).send({
					status: "error",
					message: "Erreur interne du serveur",
				});
			}
		},
	);

	// Route GET /users/:id
	fastify.get<{ Params: { id: string }; Reply: any }>(
		"/:id",
		{
			preHandler: [isAuthenticated, isAdmin], // ✅ Vérifie d'abord l'authentification puis l'admin
			schema: {
				tags: ["Users"],
				description: "Récupérer un utilisateur par son ID",
				params: {
					type: "object",
					properties: {
						id: { type: "integer", description: "ID de l'utilisateur" },
					},
					required: ["id"],
				},
				response: {
					[HttpStatus.OK]: {
						type: "object",
						properties: {
							status: { type: "string" },
							message: { type: "string" },
							data: {
								type: "object",
								properties: {
									id: { type: "number" },
									name: { type: "string" },
									email: { type: "string" },
									role: { type: "string" },
									createdAt: { type: "string", format: "date-time" },
									updatedAt: { type: "string", format: "date-time" },
								},
							},
						},
					},
					[HttpStatus.NOT_FOUND]: {
						description: "Utilisateur introuvable",
						type: "object",
						properties: {
							status: { type: "string" },
							message: { type: "string" },
						},
					},
				},
			},
		},
		async (request, reply) => {
			try {
				console.log("🟢 Requête reçue pour /users/:id", { params: request.params, user: request.user });
	
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
				console.error("❌ Erreur lors de la récupération de l'utilisateur :", error);
				return reply.status(500).send({
					status: "error",
					message: "Erreur interne du serveur",
				});
			}
		}
	);
	
}
