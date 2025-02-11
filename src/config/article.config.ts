import { HttpStatus } from "./http.config";
import { SecurityConfig } from "./security.config";

export class ArticleConfig {
	static readonly TITLE_LENGTH = { MIN: 5, MAX: 100 };
	static readonly DESCRIPTION_LENGTH = { MIN: 10, MAX: 250 };
	static readonly CONTENT_LENGTH = { MIN: 10, MAX: 10000 };
	static readonly TRACE: boolean = true;
	static readonly minimalLogLevel: "DEBUG" | "INFO" | "SUCCESS" | "ERROR" = "INFO";


	static readonly DEFAULT_PAGE = 1;
	static readonly DEFAULT_LIMIT = 5;
	static readonly MAX_LIMIT = 100;

}

export const ArticleDocExample = [
	{
		title: "Titre de l'article",
		description: "Description de l'article",
		content: "Contenu de l'article",
	},
	{
		title: "Titre de l'article NON valide",
		description: "NON valide",
		content: "NON valide",
	},
];
export const ArticleDocExampleReassign = [
	{
		oldUserId: 1,
		newUserId: 2,
	},
	{
		oldUserId: null,
		newUserId: 2,
	},
];

export const ArticleMessages = {
	TITLE_REQUIRED: "Le titre est obligatoire",
	TITLE_LENGTH: `Le titre doit contenir entre ${ArticleConfig.TITLE_LENGTH.MIN} et ${ArticleConfig.TITLE_LENGTH.MAX} caractères`,

	DESCRIPTION_REQUIRED: "La description est obligatoire",
	DESCRIPTION_LENGTH: `La description doit contenir entre ${ArticleConfig.DESCRIPTION_LENGTH.MIN} et ${ArticleConfig.DESCRIPTION_LENGTH.MAX} caractères`,

	CONTENT_REQUIRED: "Le contenu est obligatoire",
	CONTENT_LENGTH: `Le contenu doit contenir entre ${ArticleConfig.CONTENT_LENGTH.MIN} et ${ArticleConfig.CONTENT_LENGTH.MAX} caractères`,
};

export const ArticleSchemas = {

	GetAllArticles: {
        tags: ["Articles"],
        description: "Récupérer la liste des articles avec pagination",
        security: SecurityConfig.PUBLIC_ROUTE,
        querystring: {
            type: "object",
            properties: {
                page: { 
                    type: "integer", 
                    minimum: 1, 
                    default: ArticleConfig.DEFAULT_PAGE,
                    description: "Numéro de la page"
                },
                limit: { 
                    type: "integer", 
                    minimum: 1, 
                    maximum: ArticleConfig.MAX_LIMIT,
                    default: ArticleConfig.DEFAULT_LIMIT,
                    description: "Nombre d'articles par page"
                },
            },
        },
        response: {
            [HttpStatus.OK]: {
                type: "object",
                properties: {
                    status: { type: "string" },
                    message: { 
                        type: "object",
                        properties: {
                            state: { type: "string" },
                            details: { type: "string" },
                        }
                    },
                    total: { type: "integer" }, // ✅ Harmonisation avec le nom utilisé dans la réponse
                    page: { type: "integer" },
                    limit: { type: "integer" },
                    data: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                id: { type: "integer" },
                                title: { type: "string" },
                                description: { type: "string" },
                                content: { type: "string" },
                                createdAt: { type: "string", format: "date-time" },
                                updatedAt: { type: "string", format: "date-time" },
                                createdById: { type: ["integer", "null"] },
                                createdBy: {
                                    type: ["object", "null"],
                                    nullable: true,
                                    properties: {
                                        id: { type: "integer" },
                                        name: { type: "string" },
                                        email: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            [HttpStatus.INTERNAL_SERVER_ERROR]: {
                description: "Erreur interne du serveur",
                type: "object",
                properties: {
                    status: { type: "string" },
                    message: { type: "string" },
                },
            },
        },
    },

	GetArticleById: {
        tags: ["Articles"],
        description: "Récupérer un article par son ID",
        security: SecurityConfig.PUBLIC_ROUTE,
        params: {
            type: "object",
            properties: {
                id: { type: "integer", description: "ID de l'article" },
            },
            required: ["id"],
        },
        response: {
            [HttpStatus.OK]: {
                type: "object",
                properties: {
                    status: { type: "string" },
                    message: { 
                        type: "object",
                        properties: {
                            state: { type: "string" },
                            details: { type: "string" },
                        }
                    },
                    data: {
                        type: "object",
                        properties: {
                            id: { type: "integer" },
                            title: { type: "string" },
                            description: { type: "string" },
                            content: { type: "string" },
                            createdAt: { type: "string", format: "date-time" },
                            updatedAt: { type: "string", format: "date-time" },
                            createdById: { type: ["integer", "null"] },
                            createdBy: {
                                type: ["object", "null"],
                                nullable: true,
                                properties: {
                                    id: { type: "integer" },
                                    name: { type: "string" },
                                    email: { type: "string" },
                                },
                            },
                        },
                    },
                },
            },
            [HttpStatus.NOT_FOUND]: {
                description: "Article non trouvé",
                type: "object",
                properties: {
                    status: { type: "string" },
                    message: { 
                        type: "object",
                        properties: {
                            state: { type: "string" },
                            details: { type: "string" },
                        }
                    },
                },
            },
            [HttpStatus.INTERNAL_SERVER_ERROR]: {
                description: "Erreur interne du serveur",
                type: "object",
                properties: {
                    status: { type: "string" },
                    message: { type: "string" },
                },
            },
        },
    },


	CreateArticle: {
		summary: "Créer un nouvel article",
		description: "Créer un nouvel article (admin uniquement)",
		tags: ["Articles"],
		security: SecurityConfig.SECURED_ROUTE,
		body: {
			type: "object",
			required: ["title", "description", "content"],
			properties: {
				title: {
					type: "string",
					description: "Titre de l'article",
					minLength: ArticleConfig.TITLE_LENGTH.MIN,
					maxLength: ArticleConfig.TITLE_LENGTH.MAX,
				},
				description: {
					type: "string",
					description: "Brève description",
					minLength: ArticleConfig.DESCRIPTION_LENGTH.MIN,
					maxLength: ArticleConfig.DESCRIPTION_LENGTH.MAX,
				},
				content: {
					type: "string",
					description: "Contenu de l'article",
					minLength: ArticleConfig.CONTENT_LENGTH.MIN,
					maxLength: ArticleConfig.CONTENT_LENGTH.MAX,
				},
			},
			examples: ArticleDocExample,
		},
		response: {
			[HttpStatus.CREATED]: {
				description: "Article créé avec succès",
				type: "object",
				properties: {
					message: { type: "string" },
					article: {
						type: "object",
						properties: {
							id: { type: "number" },
							title: { type: "string" },
							description: { type: "string" },
							content: { type: "string" },
							createdAt: { type: "string", format: "date-time" },
							createdBy: { type: "number" },
						},
					},
				},
			},
			[HttpStatus.BAD_REQUEST]: { description: "Erreur de validation" },
			[HttpStatus.UNAUTHORIZED]: { description: "Non autorisé" },
			[HttpStatus.INTERNAL_SERVER_ERROR]: { description: "Erreur serveur" },
		},
	},
	UpdateArticle: {
		summary: "Modifier un article",
		description: "Modifier un article par son ID (admin uniquement)",
		tags: ["Articles"],
		security: SecurityConfig.SECURED_ROUTE,
		params: {
			type: "object",
			properties: {
				id: { type: "integer", description: "ID de l'article" },
			},
			required: ["id"],
		},
		body: {
			type: "object",
			properties: {
				title: { type: "string", description: "Titre de l'article" },
				description: { type: "string", description: "Brève description" },
				content: { type: "string", description: "Contenu de l'article" },
			},
			required: [],
		},
		response: {
			[HttpStatus.OK]: {
				description: "Article modifié avec succès",
				type: "object",
				properties: {
					status: { type: "string" },
					message: { type: "string" },
					data: {
						type: "object",
						properties: {
							id: { type: "number" },
							title: { type: "string" },
							description: { type: "string" },
							content: { type: "string" },
							createdAt: { type: "string", format: "date-time" },
							updatedAt: { type: "string", format: "date-time" },
							createdById: { type: "number" },
						},
					},
				},
			},
			[HttpStatus.BAD_REQUEST]: { description: "Erreur de validation" },
			[HttpStatus.FORBIDDEN]: { description: "Non autorisé" },
			[HttpStatus.NOT_FOUND]: { description: "Article non trouvé" },
			[HttpStatus.INTERNAL_SERVER_ERROR]: { description: "Erreur serveur" },
		},
	},
	ReassignArticles: {
		summary: "Réattribuer les articles",
		description:
			"Réattribuer les articles d'un utilisateur supprimé ou désassigné (admin uniquement).",
		tags: ["Articles"],
		security: SecurityConfig.SECURED_ROUTE,
		body: {
			type: "object",
			required: ["newUserId"],
			properties: {
				oldUserId: {
					oneOf: [{ type: "number" }, { type: "null" }],
					description: "ID de l'ancien utilisateur (null si aucun)",
				},
				newUserId: {
					type: "number",
					description: "ID du nouvel utilisateur",
				},
			},
			examples: [
				// ✅ Correction : Fastify attend un tableau et non un objet
				{
					oldUserId: ArticleDocExampleReassign[0].oldUserId,
					newUserId: ArticleDocExampleReassign[0].newUserId,
				},
				{
					oldUserId: ArticleDocExampleReassign[1].oldUserId,
					newUserId: ArticleDocExampleReassign[1].newUserId,
				},
			],
		},
		response: {
			[HttpStatus.OK]: {
				description: "Articles réattribués avec succès",
				type: "object",
				properties: {
					status: { type: "string" },
					message: { type: "string" },
					count: { type: "number" },
					articles: {
						type: "array",
						items: {
							type: "object",
							properties: {
								id: { type: "number" },
								title: { type: "string" },
								description: { type: "string" },
								content: { type: "string" },
								createdAt: { type: "string", format: "date-time" },
								updatedAt: { type: "string", format: "date-time" },
							},
						},
					},
				},
				examples: [
					// ✅ Correction ici aussi (Fastify attend un tableau)
					{
						summary: "Réassignation réussie",

						status: "success",
						message: "Articles réassignés avec succès à l'utilisateur 2.",
						count: 3,
					},
				],
			},
			[HttpStatus.BAD_REQUEST]: {
				description: "Erreur de validation",
				type: "object",
				properties: {
					status: { type: "string" },
					message: { type: "string" },
				},
			},
			[HttpStatus.UNAUTHORIZED]: { description: "Non autorisé" },
			[HttpStatus.NOT_FOUND]: {
				description: "Utilisateur ou articles non trouvés",
				type: "object",
				properties: {
					status: { type: "string" },
					message: { type: "string" },
				},
				examples: [
					{
						summary: "Utilisateur non trouvé",
						value: {
							status: "error",
							message: "Utilisateur avec l'ID 1 introuvable.",
						},
					},
				],
			},
			[HttpStatus.INTERNAL_SERVER_ERROR]: { description: "Erreur serveur" },
		},
	},
	DeleteArticle: {
		summary: "Supprimer un article",
		description: "Supprimer un article par son ID (admin uniquement)",
		tags: ["Articles"],
		security: SecurityConfig.SECURED_ROUTE,
		params: {
			type: "object",
			properties: {
				id: { type: "integer", description: "ID de l'Article" },
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
							title: { type: "string" },
							content: { type: "string" },
							createdAt: { type: "string", format: "date-time" },
							updatedAt: { type: "string", format: "date-time" },
						},
					},
				},
			},
			[HttpStatus.NOT_FOUND]: {
				description: "Article introuvable",
				type: "object",
				properties: {
					status: { type: "string" },
					message: { type: "string" },
				},
			},
		},
	},
};
