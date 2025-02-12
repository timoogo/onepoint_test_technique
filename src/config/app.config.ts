export enum ReadmeAnchor {
	PAGINATION_CONFIG = "pagination-config",
}

export enum Tags {
	USERS = "Users",
	ARTICLES = "Articles",
	AUTH = "Auth",
	ADMIN = "Actions Admin",
}

export class AppConfig {
	// 📌 Centralisation des configurations globales

	// ✅ Règles globales par défaut (peuvent être écrasées dans un module spécifique)
	static readonly PaginationConfig = {
		DEFAULT_PAGE: 1,
		DEFAULT_LIMIT: 10,
		PAGE_MAX_LIMIT: 100,
		PAGE_MIN_LIMIT: 1,
	};

	static getReadMeUrl(anchor = ""): string {
		const baseUrl =
			"https://github.com/timoogo/onepoint_test_technique/blob/main/README.md";
		return anchor ? baseUrl + "#" + anchor : baseUrl;
	}
}
export type RouteOptions = {
	url: string;
	method?: string;
	statusCode?: number;
	displayInConsole?: boolean;
};

export const publicRoutes: RouteOptions[] = [
	{ url: "/", displayInConsole: false },
	{ url: "/docs", displayInConsole: false },
	{ url: "/auth/login", method: "POST" },
	{ url: "/users/register", method: "POST" },
	{ url: "/auth/logout", method: "POST" }, // Pour éviter la vérification du token
	{ url: "/auth/amILoggedIn", method: "GET" },
	{ url: "/articles", method: "GET" },
	{ url: "/articles/:id", method: "GET" },
];
