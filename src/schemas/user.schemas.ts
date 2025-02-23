import { Tags } from "../config/app.config";
import { HttpStatus } from "../config/http.config";
import { SecurityConfig } from "../config/security.config";
import { UserConfig } from "../config/user.config";
import {
	UserDocRequestExamplesX,
	UserGetAllDocRequestExamples,
	UserGetAllDocResponseExamples,
	UserPostDocResponseExamples,
	UserDeleteDocRequestExamples,
	UserDeleteDocResponseExamples,
} from "../docs/user.doc.examples";

import { UserMessages } from "../messages/user.messages";
export const UserSchemas = {
	GetAllUsers: {
		tags: ["Users"],
		summary: UserMessages.GET_ALL_USERS_SUMMARY,
		description: UserMessages.GET_ALL_USERS_DESCRIPTION,
		security: SecurityConfig.SECURED_ROUTE,
		examples: UserGetAllDocRequestExamples,
		querystring: {
			type: "object",
			properties: {
				page: {
					type: "integer",
					minimum: UserConfig.getOrDefault(
						"PaginationConfig",
						UserConfig.PaginationConfig.PAGE_MIN_LIMIT,
					),
					default: UserConfig.PaginationConfig.DEFAULT_PAGE,
					description: "Numéro de la page",
				},
				limit: {
					type: "integer",
					minimum: UserConfig.getOrDefault(
						"PaginationConfig",
						UserConfig.PaginationConfig.PAGE_MIN_LIMIT,
					),
					maximum: UserConfig.getOrDefault(
						"PaginationConfig",
						UserConfig.PaginationConfig.PAGE_MAX_LIMIT,
					),
					default: UserConfig.PaginationConfig.DEFAULT_LIMIT,
					description: "Nombre d'utilisateurs par page",
				},
			},
			examples: UserGetAllDocRequestExamples,
		},

		response: {
			[HttpStatus.OK]: {
				description: "Liste des utilisateurs",
				content: {
					"application/json": {
						examples: {
							success: {
								summary: "Exemple de réponse réussie",
								value: UserGetAllDocResponseExamples[0],
							},
							error: {
								summary: "Exemple de réponse d'erreur",
								value: UserGetAllDocResponseExamples[1],
							},
							successEmpty: {
								summary: "Exemple de réponse réussie avec un tableau vide",
								value: UserGetAllDocResponseExamples[2],
							},
						},
						schema: {
							type: "object",
							properties: {
								status: { type: "string" },
								message: {
									type: "object",
									properties: {
										state: { type: "string" },
										details: { type: "string" },
									},
								},
								total: { type: "integer" },
								page: { type: "integer" },
								limit: { type: "integer" },
								data: {
									type: "array",
									items: {
										type: "object",
										properties: {
											id: { type: "integer" },
											name: { type: "string" },
											email: { type: "string" },
											role: { type: "string" },
											createdAt: { type: "string", format: "date-time" },
											updatedAt: { type: "string", format: "date-time" },
										},
									},
								},
							},
						},
					},
				},
			},
		},
	},

	GetUserById: {
		tags: ["Users"],
		summary: UserMessages.GET_USER_BY_ID_SUMMARY,
		description: UserMessages.GET_USER_BY_ID_DESCRIPTION,
		security: SecurityConfig.SECURED_ROUTE,
		params: {
			type: "object",
			properties: {
				id: { type: "integer", description: "ID de l'utilisateur" },
			},
			required: ["id"],
		},
		response: {
			[HttpStatus.OK]: {
				description: "Utilisateur récupéré avec succès",
				content: {
					"application/json": {
						schema: {
							type: "object",
							properties: {
								status: { type: "string" },
								message: {
									type: "object",
									properties: {
										state: { type: "string" },
										details: { type: "string" },
									},
								},
								data: {
									type: "object",
									properties: {
										id: { type: "integer" },
										name: { type: "string" },
										email: { type: "string" },
										role: { type: "string" },
										createdAt: { type: "string", format: "date-time" },
										updatedAt: { type: "string", format: "date-time" },
									},
								},
							},
						},
						examples: {
							success: {
								summary: "Exemple de réponse réussie",
								value: {
									status: "success",
									message: {
										state: "User retrieved",
										details: "User with ID 1 fetched successfully.",
									},
									data: {
										id: 1,
										name: "John Doe",
										email: "john.doe@example.com",
										role: "USER",
										createdAt: "2024-01-01T12:00:00Z",
										updatedAt: "2024-02-01T12:00:00Z",
									},
								},
							},
						},
					},
				},
			},
			[HttpStatus.NOT_FOUND]: {
				description: "Utilisateur non trouvé",
				content: {
					"application/json": {
						schema: {
							type: "object",
							properties: {
								status: { type: "string" },
								message: {
									type: "object",
									properties: {
										state: { type: "string" },
										details: { type: "string" },
									},
								},
							},
						},
						examples: {
							notFound: {
								summary: "Exemple de réponse si l'utilisateur n'existe pas",
								value: {
									status: "error",
									message: {
										state: "User not found",
										details: "No user found with ID 99.",
									},
								},
							},
						},
					},
				},
			},
			[HttpStatus.INTERNAL_SERVER_ERROR]: {
				description: "Erreur interne du serveur",
				content: {
					"application/json": {
						schema: {
							type: "object",
							properties: {
								status: { type: "string" },
								message: {
									type: "object",
									properties: {
										state: { type: "string" },
										details: { type: "string" },
									},
								},
							},
						},
						examples: {
							internalError: {
								summary: "Exemple d'erreur serveur",
								value: {
									status: "error",
									message: {
										state: "Internal server error",
										details:
											"An unexpected error occurred while retrieving the user.",
									},
								},
							},
						},
					},
				},
			},
		},
	},

	Register: {
		tags: ["Users"],
		summary: UserMessages.USER_CREATE_SUMMARY,
		description: UserMessages.USER_CREATE_DESCRIPTION,
		body: {
			type: "object",
			required: ["name", "email", "password"],
			properties: {
				name: {
					type: "string",
					minLength: UserConfig.NAME_LENGTH.MIN,
					maxLength: UserConfig.NAME_LENGTH.MAX,
					description: "Nom complet de l'utilisateur",
				},
				email: {
					type: "string",
					format: "email",
					description: "Adresse email unique",
				},
				password: {
					type: "string",
					description: "Mot de passe sécurisé",
				},
				role: {
					type: "string",
					enum: [...UserConfig.UserRolesArray],
					description: "Rôle de l'utilisateur",
				},
			},
			examples: UserDocRequestExamplesX,
		},
		response: {
			[HttpStatus.CREATED]: {
				description: "Utilisateur créé avec succès",
				examples: UserPostDocResponseExamples,
				type: "object",
				properties: {
					status: {
						type: "object",
						properties: {
							code: { type: "number" },
							message: { type: "string" },
						},
					},
					message: { type: "string" },
					data: {
						type: "object",
						properties: {
							id: { type: "integer" },
							name: { type: "string" },
							email: { type: "string" },
							role: { type: "string" },
						},
					},
				},
			},
			[HttpStatus.BAD_REQUEST]: {
				type: "object",
				properties: {
					message: { type: "string", description: "Erreur de validation" },
				},
			},
		},
	},

	DeleteUserById: {
		tags: [Tags.ADMIN],
		summary: UserMessages.DELETE_USER_BY_ID_SUMMARY,
		description: UserMessages.DELETE_USER_BY_ID_DESCRIPTION,
		security: SecurityConfig.SECURED_ROUTE,
		examples: UserDeleteDocRequestExamples.DeleteSuccess,
		params: {
			type: "object",
			properties: {
				id: { type: "integer", description: "ID de l'utilisateur" },
			},
			required: ["id"],
		},
		response: {
			[HttpStatus.OK]: {
				description: "Utilisateur supprimé avec succès",
				content: {
					"application/json": {
						schema: {
							type: "object",
							properties: {
								status: { type: "string" },
								message: {
									type: "object",
									properties: {
										state: { type: "string" },
										details: { type: "string" },
									},
								},
								data: {
									type: "object",
									properties: {
										id: { type: "integer" },
										name: { type: "string" },
										email: { type: "string" },
										role: { type: "string" },
										createdAt: { type: "string", format: "date-time" },
										updatedAt: { type: "string", format: "date-time" },
									},
								},
							},
						},
						examples: UserDeleteDocResponseExamples.Success,
					},
				},
			},
			[HttpStatus.NOT_FOUND]: {
				description: "Utilisateur introuvable",
				content: {
					"application/json": {
						schema: {
							type: "object",
							properties: {
								status: { type: "string" },
								message: {
									type: "object",
									properties: {
										state: { type: "string" },
										details: { type: "string" },
									},
								},
							},
						},
						examples: UserDeleteDocResponseExamples.NotFound,
					},
				},
			},
			[HttpStatus.INTERNAL_SERVER_ERROR]: {
				description: "Erreur interne du serveur",
				content: {
					"application/json": {
						schema: {
							type: "object",
							properties: {
								status: { type: "string" },
								message: {
									type: "object",
									properties: {
										state: { type: "string" },
										details: { type: "string" },
									},
								},
							},
						},
						examples: UserDeleteDocResponseExamples.InternalError,
					},
				},
			},
		},
	},
	
	
};
