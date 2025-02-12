import { HttpStatus } from "../config/http.config";
import { SecurityConfig } from "../config/security.config";
import { UserConfig, UserMessages } from "../config/user.config";
import { UserDocRequestExamples, UserDocResponseExamples } from "../docs/user.post.doc.examples";

export const UserSchemas = {
    GetAllUsers: {
        tags: ["Users"],
        summary: "Récupérer tous les utilisateurs",
        description: UserMessages.GET_ALL,
        security: SecurityConfig.SECURED_ROUTE,
        querystring: {
            type: "object",
            properties: {
                page: {
                    type: "integer",
                    minimum: UserConfig.getOrDefault(
                        "PAGE_MIN_LIMIT",
                        UserConfig.PAGE_MIN_LIMIT,
                    ),
                    default: UserConfig.DEFAULT_PAGE,
                    description: "Numéro de la page",
                },
                limit: {
                    type: "integer",
                    minimum: UserConfig.getOrDefault(
                        "PAGE_MIN_LIMIT",
                        UserConfig.PAGE_MIN_LIMIT,
                    ),
                    maximum: UserConfig.getOrDefault(
                        "PAGE_MAX_LIMIT",
                        UserConfig.PAGE_MAX_LIMIT,
                    ),
                    default: UserConfig.DEFAULT_LIMIT,
                    description: "Nombre d'utilisateurs par page",
                },
            },
        },
        response: {
            [HttpStatus.OK]: {
                type: "object",
                properties: {
                    status: { type: "string" },
                    message: { type: "string" },
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
                },
            },
        },
    },

    GetUserById: {
        tags: ["Users"],
        summary: "Récupérer un utilisateur par ID",
        description: "Retourne un utilisateur spécifique à partir de son ID.",
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
                type: "object",
                properties: {
                    status: { type: "string" },
                    message: { type: "string" },
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
        },
    },

	Register: {
		tags: ["Users"],
		summary: "Créer un utilisateur",
		description: `${UserMessages.REGISTER}`,
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
			examples: UserDocRequestExamples,
		},
		response: {
			[HttpStatus.CREATED]: {
				description: "Utilisateur créé avec succès",
                examples: UserDocResponseExamples,
				type: "object",
				properties: {
					status: { type: "object",
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

	DeleteUser: {
		tags: ["Users"],
		summary: "Supprimer un utilisateur",
		description: "Supprime un utilisateur spécifique à partir de son ID.",
		security: [{ bearerAuth: [] }],
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
					message: {
						type: "string",
						description: "Utilisateur supprimé avec succès",
					},
				},
			},
			[HttpStatus.NOT_FOUND]: {
				description: "Utilisateur introuvable",
				type: "object",
				properties: {
					message: { type: "string", description: "Utilisateur non trouvé" },
				},
			},
		},
	},
};
