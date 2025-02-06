import { FastifyInstance, FastifyRequest } from "fastify";
import { EnvironnementLevel } from "../config/environnement.config";
import { DocExample, UserConfig, UserRoles } from "../config/user.config";
import { UserController } from "../controllers/user.controller";
import { CreateUserDto } from "../dtos/create-user.dto";
import { validateDto } from "../middlewares/validate-dto.middleware";

import { HttpMessages, HttpStatus } from "../config/http.config";
import { ValidationException } from "../exeptions/validation-exception.exception";
import { PasswordValidationException } from "../exeptions/password-validation.exception";
export async function userPostRoutes(fastify: FastifyInstance) {
	const userController = new UserController();

	fastify.post(
		"/register",
		{
			preHandler: [], // ✅ Aucun middleware nécessaire pour cette route

			schema: {
				security: [],
				consumes: ["application/json"],
				produces: ["application/json"],
				tags: ["Users"], // Cette ligne associe la route à la section "User"

				description: `Créer un utilisateur. Nécessaire pour accéder aux routes protégées.
				Ne pas oublier role: admin pour créer un admin. C'est ici qu'on génère un utilisateur avec un token JWT valide. 
				`,
				summary: "Créer un utilisateur",
				body: {
					type: "object",
					required: ["name", "email", "password"],
					properties: {
						name: {
							type: "string",
							minLength: UserConfig.NAME_LENGTH.MIN,
							maxLength: UserConfig.NAME_LENGTH.MAX,
							description: "Nom complet de l'utilisateur",
							examples: [DocExample[0].name],
						},
						email: {
							type: "string",
							format: "email",
							description: "Adresse email",
							examples: [DocExample[0].email],
						},
						password: {
							type: "string",
							description: "Mot de passe sécurisé",
							examples: [DocExample[0].password],
						},
						role: {
							type: "string",
							enum: [...UserConfig.UserRolesArray],
							description: "Rôle de l'utilisateur",
							examples: [UserRoles.USER],
						},
					},
					examples: [...DocExample],
				},

				response: {
					201: {
						type: "object",
						properties: {
							message: { type: "string" },
							user: {
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
			},
		},
		async (request: FastifyRequest<{ Body: CreateUserDto }>, reply) => {
			try {
				const validatedBody = await validateDto(CreateUserDto, request.body);
				const newUser = await userController.createUser(validatedBody);
		
				return reply.status(HttpStatus.CREATED).send({
					status: {
						code: HttpStatus.CREATED,
						message: HttpMessages.CREATED,
					},
					user: newUser,
				});
			} catch (error: any) {
				console.error("🔴 Erreur capturée :", error);
		
				// 🟢 Gestion spécifique des erreurs de mot de passe
				if (error instanceof PasswordValidationException) {
					return reply.status(HttpStatus.BAD_REQUEST).send({
						status: "error",
						errorCode: HttpStatus.BAD_REQUEST,
						message: UserConfig.PASSWORD.PATTERN_MESSAGE,
						violatedConstraints: error.violatedConstraints,
					});
				}
		
				// 🟢 Gestion générique des erreurs de validation
				if (error instanceof ValidationException) {
					return reply.status(HttpStatus.BAD_REQUEST).send({
						status: "error",
						errorCode: HttpStatus.BAD_REQUEST,
						message: HttpMessages.BAD_REQUEST,
						errors: error.errors,
					});
				}
		
				// 📌 Gestion des erreurs internes
				return reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
					status: "error",
					errorCode: HttpStatus.INTERNAL_SERVER_ERROR,
					message: HttpMessages.INTERNAL_SERVER_ERROR,
					error: {
						message: error.message || HttpMessages.INTERNAL_SERVER_ERROR,
					},
				});
			}
		}
	);
}
