import { AppConfig, ReadmeAnchor } from "./app.config";
import { ConfigBase } from "./config.base";
import { DocConfig } from "./doc.config";

// Enum de base pour les verbes HTTP standards
export enum HttpVerb {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE",
	PATCH = "PATCH",
}

// Définition des actions personnalisées
const CustomActions = {
	REASSIGN: "REASSIGN",
	GET_ALL: "GET_ALL",
} as const;

// Type combiné
type ExtendedHttpVerb =
	| HttpVerb
	| (typeof CustomActions)[keyof typeof CustomActions];

// Export des constantes combinées
export const HTTP_ACTIONS = {
	...HttpVerb,
	...CustomActions,
} as const;

export class ArticleConfig extends ConfigBase {
	static readonly TITLE_LENGTH = { MIN: 5, MAX: 100 };
	static readonly DESCRIPTION_LENGTH = { MIN: 10, MAX: 250 };
	static readonly CONTENT_LENGTH = { MIN: 10, MAX: 10000 };
	static readonly TRACE: boolean = true;
	static readonly minimalLogLevel: "DEBUG" | "INFO" | "SUCCESS" | "ERROR" =
		"INFO";

	static readonly DEFAULT_PAGE = AppConfig.PaginationConfig.DEFAULT_PAGE;
	static readonly DEFAULT_LIMIT = AppConfig.PaginationConfig.DEFAULT_LIMIT;
	static readonly PAGE_MIN_LIMIT = AppConfig.PaginationConfig.PAGE_MIN_LIMIT;
	static readonly PAGE_MAX_LIMIT = AppConfig.PaginationConfig.PAGE_MAX_LIMIT;
}
export const ArticleMessages = {
	TITLE_REQUIRED: "Le titre est obligatoire",
	TITLE_LENGTH: `Le titre doit contenir entre ${ArticleConfig.TITLE_LENGTH.MIN} et ${ArticleConfig.TITLE_LENGTH.MAX} caractères`,

	DESCRIPTION_REQUIRED: "La description est obligatoire",
	DESCRIPTION_LENGTH: `La description doit contenir entre ${ArticleConfig.DESCRIPTION_LENGTH.MIN} et ${ArticleConfig.DESCRIPTION_LENGTH.MAX} caractères`,

	CONTENT_REQUIRED: "Le contenu est obligatoire",
	CONTENT_LENGTH: `Le contenu doit contenir entre ${ArticleConfig.CONTENT_LENGTH.MIN} et ${ArticleConfig.CONTENT_LENGTH.MAX} caractères`,

	/**
	 * Message d'avertissement pour la réattribution d'un article.
	 * Il rappelle à l'utilisateur de bien vérifier l'ID du nouvel utilisateur.
	 */
	REASSIGN: DocConfig.generateWarningMessage(
		"Assurez-vous que l'ID du nouvel utilisateur est correct.",
	),

	/**
	 * Message d'avertissement avant la suppression d'un article.
	 * Il indique à l'utilisateur de bien vérifier l'ID avant de supprimer.
	 */
	DELETE: DocConfig.generateWarningMessage(
		"Assurez-vous que l'ID de l'utilisateur est correct avant de supprimer.",
	),

	/**
	 * Message d'avertissement avant la création d'un article.
	 * Il rappelle à l'utilisateur de bien vérifier les informations saisies.
	 */
	CREATE: DocConfig.generateWarningMessage(
		"Vérifiez bien les informations avant de créer l'article.",
	),

	/**
	 * Message d'avertissement pour la récupération d'un article par son ID.
	 * Il rappelle à l'utilisateur de bien vérifier l'ID avant de faire la requête.
	 */
	GET_BY_ID: DocConfig.generateWarningMessage(
		"Assurez-vous que l'ID de l'article est correct avant de le récupérer.",
	),

	/**
	 * Message d'avertissement pour la récupération de tous les articles.
	 * Il rappelle à l'utilisateur de bien vérifier les paramètres de requête si applicable.
	 */
	GET_ALL: DocConfig.generateWarningMessage([
		"Vérifiez les paramètres de requête avant de récupérer tous les articles.",
		"Vu que plusieurs articles peuvent être récupérés, il est possible d'ajouter des paramètres de pagination pour limiter le nombre de résultats.",
		"**Recommandation** : il est possible de configurer les paramètres de pagination.",
	],`Voir le [README](${AppConfig.getReadMeUrl(ReadmeAnchor.PAGINATION_CONFIG)}) pour plus d'informations.`),

	/**
	 * Message d'avertissement pour la mise à jour d'un article.
	 * Il rappelle à l'utilisateur de bien vérifier l'ID avant de faire la requête.
	 */
	UPDATE: DocConfig.generateWarningMessage(
		"Assurez-vous que l'ID de l'article est correct avant de le mettre à jour.",
	),
};
