
export enum ReadmeAnchor {
	PAGINATION_CONFIG = "pagination-config",
}

export class AppConfig {
	// 📌 Centralisation des configurations globales

	// ✅ Règles globales par défaut (peuvent être écrasées dans un module spécifique)
	static readonly DEFAULT_PAGE = 1;
	static readonly DEFAULT_LIMIT = 10;
	static readonly PAGE_MAX_LIMIT = 100;
	static readonly PAGE_MIN_LIMIT = 1;

	static readonly Messages = {
		SUCCESS: "Opération réussie",
		ERROR: "Une erreur est survenue",
	};

	static getReadMeUrl(anchor?: string): string {
		const baseUrl =
			"https://github.com/timoogo/onepoint_test_technique/blob/main/README.md";
		return anchor ? baseUrl + "#" + anchor : baseUrl;
	}
}
