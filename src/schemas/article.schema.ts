import { Tags } from "../config/app.config";
import { ArticleConfig, ArticleMessages } from "../config/article.config";
import { HttpStatus } from "../config/http.config";
import { SecurityConfig } from "../config/security.config";
import {
	ArticleDocRequestExamples,
	ArticleDocResponseExamples,
} from "../docs/article.doc.examples";

export const ArticleSchemas = {
	GetAllArticles: {
		tags: [Tags.ARTICLES],
		description: ArticleMessages.GET_ALL,
		security: SecurityConfig.PUBLIC_ROUTE,
		examples: ArticleDocRequestExamples.GetAllArticles,
		querystring: {
			type: "object",
			properties: {
				page: {
					type: "integer",
					minimum: ArticleConfig.DEFAULT_PAGE,
					default: ArticleConfig.DEFAULT_PAGE,
					description: "Numéro de la page",
				},
				limit: {
					type: "integer",
					minimum: ArticleConfig.PAGE_MIN_LIMIT,
					maximum: ArticleConfig.PAGE_MAX_LIMIT,
					default: ArticleConfig.DEFAULT_LIMIT,
					description: "Nombre d'articles par page",
				},
			},
		},

		response: {
			[HttpStatus.OK]: {
				examples: ArticleDocResponseExamples.GetAllArticles,
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
				examples: ArticleDocResponseExamples.GetAllArticles,
				type: "object",
				properties: {
					status: { type: "string" },
					message: { type: "string" },
				},
			},
		},
	},

	GetArticleById: {
		tags: [Tags.ARTICLES],
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
						},
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

	CreateArticle: {
		summary: "Créer un nouvel article",
		description: "Créer un nouvel article (admin uniquement)",
		tags: [Tags.ADMIN],
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
			// examples: ArticleDocExamples.Article,
		},
		response: {
			[HttpStatus.CREATED]: {
				description: "Article créé avec succès",
				type: "object",
				properties: {
					status: { type: "string", example: "success" },
					message: {
						type: "object",
						properties: {
							state: { type: "string", example: "Ressource créée." },
							details: { type: "string", example: "Article créé avec succès" },
						},
					},
					data: {
						type: "object",
						properties: {
							id: { type: "number", example: 50 },
							title: { type: "string", example: "Titre de l'article" },
							description: {
								type: "string",
								example: "Description de l'article",
							},
							content: { type: "string", example: "Contenu de l'article" },
							createdAt: {
								type: "string",
								format: "date-time",
								example: "2025-02-12T10:00:00.000Z",
							},
							updatedAt: {
								type: "string",
								format: "date-time",
								example: "2025-02-12T10:00:00.000Z",
							},
							createdById: { type: "number", example: 44 },
							createdBy: {
								type: "object",
								properties: {
									id: { type: "number", example: 44 },
									name: { type: "string", example: "John Doe" },
									email: { type: "string", example: "johndoe@example.com" },
								},
							},
						},
					},
				},
			},
			[HttpStatus.BAD_REQUEST]: {
				description: "Erreur de validation",
				type: "object",
				properties: {
					status: { type: "string", example: "error" },
					message: { type: "string", example: "Requête invalide." },
				},
			},
			[HttpStatus.UNAUTHORIZED]: {
				description: "Non autorisé",
				type: "object",
				properties: {
					status: { type: "string", example: "error" },
					message: { type: "string", example: "Accès refusé." },
				},
			},
			[HttpStatus.INTERNAL_SERVER_ERROR]: {
				description: "Erreur serveur",
				type: "object",
				properties: {
					status: { type: "string", example: "error" },
					message: {
						type: "string",
						example: "Une erreur interne est survenue.",
					},
				},
			},
		},
	},
	UpdateArticle: {
		summary: "Modifier un article",
		description: "Modifier un article par son ID (admin uniquement)",
		tags: [Tags.ADMIN],
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

	DeleteArticle: {
		summary: "Supprimer un article",
		description: ArticleMessages.DELETE,
		tags: [Tags.ADMIN],
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
				description: "Article supprimé avec succès",
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
							id: { type: "number", example: 42 },
							name: { type: "string", example: "John Doe" },
							email: { type: "string", example: "johndoe@example.com" },
							role: { type: "string", example: "user" },
							createdAt: {
								type: "string",
								format: "date-time",
								example: "2025-02-12T14:51:31.213Z",
							},
							updatedAt: {
								type: "string",
								format: "date-time",
								example: "2025-02-12T14:51:31.213Z",
							},
						},
					},
				},
				// examples: UserDocExamples.Delete, // Exemple de réponse
			},
			[HttpStatus.NOT_FOUND]: {
				description: "Utilisateur introuvable",
				type: "object",
				properties: {
					status: { type: "string", example: "error" },
					message: {
						type: "string",
						example: "Utilisateur non trouvé avec l'ID donné.",
					},
				},
				// examples: UserDocResponseExamples.Delete,
			},
		},
	},

	ReassignArticles: {
		summary: "Réattribuer les articles",
		description: ArticleMessages.REASSIGN,
		tags: [Tags.ARTICLES],
		security: SecurityConfig.SECURED_ROUTE,
		body: {
			type: "object",
			required: ["newUserId"],
			properties: {
				oldUserId: {
					type: "number",
					nullable: true,
					description: "ID de l'ancien utilisateur (null si aucun)",
				},
				newUserId: {
					type: "number",
					description: "ID du nouvel utilisateur",
				},

				page: {
					// a grouper avec limit
					type: "integer",
					description: "Numéro de la page",
					minimum: ArticleConfig.PAGE_MIN_LIMIT,
					default: ArticleConfig.DEFAULT_PAGE,
				},
				limit: {
					// a grouper avec page
					type: "integer",
					description: "Nombre d'articles par page",
					minimum: ArticleConfig.PAGE_MIN_LIMIT,
					default: ArticleConfig.DEFAULT_LIMIT,
				},
			},
			// examples: ArticleDocExamples.Reassign, // ✅ Correct : tableau statique
		},

		response: {
			[HttpStatus.OK]: {
				description: "Articles réattribués avec succès",
				type: "object",
				properties: {
					status: { type: "string" },
					message: { type: "string" },
					count: { type: "number" },
					page: { type: "number" },
					limit: { type: "number" },
					total: { type: "number" },
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
				// examples: ArticleDocExamples.Reassign,
			},
		},
	},
};
