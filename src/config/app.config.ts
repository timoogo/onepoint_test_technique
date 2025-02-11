import { UserConfig } from "./user.config";

export class AppConfig {
	// 📌 Centralisation des configurations globales
	static readonly User = UserConfig;

	// ✅ Règles globales par défaut (peuvent être écrasées dans un module spécifique)
	static readonly DEFAULT_PAGE = 1;
	static readonly DEFAULT_LIMIT = 10;
	static readonly PAGE_MAX_LIMIT = 100;
	static readonly PAGE_MIN_LIMIT = 1;

	static readonly Messages = {
		SUCCESS: "Opération réussie",
		ERROR: "Une erreur est survenue",
	};
}
