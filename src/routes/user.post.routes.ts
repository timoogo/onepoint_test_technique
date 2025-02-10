import { FastifyInstance, FastifyRequest } from "fastify";
import { RegisterDocExample, UserConfig } from "../config/user.config";
import { UserController } from "../controllers/user.controller";
import { CreateUserDto } from "../dtos/create-user.dto";
import { validateDto } from "../middlewares/validate-dto.middleware";

import { HttpMessages, HttpStatus } from "../config/http.config";
import { PasswordValidationException } from "../exeptions/password-validation.exception";
import { ValidationException } from "../exeptions/validation-exception.exception";
export async function userPostRoutes(fastify: FastifyInstance) {
	const userController = new UserController();

	fastify.post(
		"/register",
		{
			preHandler: [],
			schema: {
				security: [],
				consumes: ["application/json"],
				produces: ["application/json"],
				tags: ["Users"], // Cette ligne associe la route à la section "User"

				description: `
				Cette route permet à un nouvel utilisateur de s'inscrire en fournissant les informations requises.  
				Une fois inscrit, il pourra se connecter et accéder aux fonctionnalités protégées.  
			  
				🔹 **Exigences** :
				- Le **nom** doit contenir entre ${UserConfig.NAME_LENGTH.MIN} et ${UserConfig.NAME_LENGTH.MAX}
				- L'**email** doit être une adresse valide et unique.
				- Le **mot de passe** doit respecter les règles de sécurité suivantes :
				  - Au moins **une lettre majuscule**.
				  - Au moins **une lettre minuscule**.
				  - Au moins **un chiffre**.
				  - Au moins **un caractère spécial** (\`!@#$%^&*\`).
				- Le **rôle** doit être l'une des valeurs autorisées [${UserConfig.UserRolesArray}].
			  
				🔹 **Scénarios de réponse** :
				- ✅ \`201 CREATED\` : Inscription réussie, l'utilisateur est enregistré.
				- ❌ \`400 BAD_REQUEST\` : Erreur de validation des champs (ex: email déjà utilisé, mot de passe non conforme).
				- ❌ \`500 INTERNAL_SERVER_ERROR\` : Erreur inattendue côté serveur.
			  
				🔹 **Exemple de requête** :
				\`\`\`json
				{
				  "name": "John Doe",
				  "email": "johndoe@example.com",
				  "password": "MotDePasseSecurisé123!",
				  "role": "user"
				}
				\`\`\`
			  
				🔹 **Exemple de réponse en cas de succès (\`201 CREATED\`)** :
				\`\`\`json
				{
				  "status": "success",
				  "message": "Utilisateur créé avec succès.",
				  "user": {
					"id": 1,
					"name": "John Doe",
					"email": "johndoe@example.com",
					"role": "user"
				  }
				}
				\`\`\`
			  
				🔹 **Exemple de réponse en cas d'erreur (\`400 BAD_REQUEST\`)** :
				\`\`\`json
				{
				  "status": "error",
				  "errorCode": 400,
				  "message": "L'email est déjà utilisé."
				}
				\`\`\`
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
							examples: [RegisterDocExample[0].name],
						},
						email: {
							type: "string",
							format: "email",
							description: "Adresse email",
							examples: RegisterDocExample.map((example) => example.email),
						},
						password: {
							type: "string",
							description: "Mot de passe sécurisé",
							examples: RegisterDocExample.map((example) => example.password),
						},
						role: {
							type: "string",
							enum: [...UserConfig.UserRolesArray],
							description: "Rôle de l'utilisateur",
							examples: RegisterDocExample.map((example) => example.role),
						},
					},
					examples: [...RegisterDocExample],
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
		},
	);
}
