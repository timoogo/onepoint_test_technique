import { AppConfig } from "./app.config";
import { ConfigBase } from "./config.base";
import { DocConfig } from "./doc.config";

export enum UserRoles {
	ADMIN = "admin",
	USER = "user",
	
}
export class UserConfig extends ConfigBase {
	static readonly UserRolesArray = Object.values(UserRoles);
	static readonly TITLE_LENGTH = { MIN: 5, MAX: 100 };
	static readonly DESCRIPTION_LENGTH = { MIN: 10, MAX: 250 };
	static readonly CONTENT_LENGTH = { MIN: 10, MAX: 10000 };
	static readonly TRACE: boolean = true;
	static readonly minimalLogLevel: "DEBUG" | "INFO" | "SUCCESS" | "ERROR" =
		"INFO";

		static readonly PaginationConfig = {
			DEFAULT_PAGE: AppConfig.PaginationConfig.DEFAULT_PAGE,
			DEFAULT_LIMIT: AppConfig.PaginationConfig.DEFAULT_LIMIT,
			PAGE_MIN_LIMIT: AppConfig.PaginationConfig.PAGE_MIN_LIMIT,
			PAGE_MAX_LIMIT: AppConfig.PaginationConfig.PAGE_MAX_LIMIT,
		}
		

	static readonly DocAnchors = {
		register: "Doc",
	}

	static readonly ID = {
		REQUIRED_MESSAGE: "L'id est obligatoire.",
		TYPE_MESSAGE: "L'id doit être un nombre.",
		POSITIVE_MESSAGE: "L'id doit être un nombre positif.",
	};

	static readonly NAME_LENGTH = { MIN: 2, MAX: 50 };

	static readonly NAME = {
		REQUIRED_MESSAGE: "Le nom est obligatoire.",
		TYPE_MESSAGE: "Le nom doit être une chaîne de caractères.",
		get LENGTH_MESSAGE() {
			return `Le nom doit contenir entre ${UserConfig.NAME_LENGTH.MIN} et ${UserConfig.NAME_LENGTH.MAX} caractères.`;
		},
	};

	static readonly EMAIL = {
		REQUIRED_MESSAGE: "L'email est obligatoire.",
		INVALID_MESSAGE: "L'email doit être valide.",
	};

	static readonly PASSWORD_LENGTH = { MIN: 8, MAX: 128 };

	static readonly PASSWORD = {
		REQUIRED_MESSAGE: "Le mot de passe est obligatoire.",
		TYPE_MESSAGE: "Le mot de passe doit être une chaîne de caractères.",
		get LENGTH_MESSAGE() {
			return `Le mot de passe doit contenir entre ${UserConfig.PASSWORD_LENGTH.MIN} et ${UserConfig.PASSWORD_LENGTH.MAX} caractères.`;
		},
		PATTERN_MESSAGE:
			"Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.",
		REGEX: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
	};

	static readonly ROLE = {
		DEFAULT: "USER", // Doit correspondre au format attendu
		PATTERN: /^(USER|ADMIN)$/, // Doit matcher avec `.toUpperCase()`
		PATTERN_MESSAGE: "Le rôle doit être 'USER' ou 'ADMIN'.",
	  };
}

// export const UserMessages = {
// 	GET_ALL: "Récupérer tous les utilisateurs",
// 	REGISTER: `${DocConfig.generateWarningMessage([
// 		`Cette route permet à un nouvel utilisateur de s'*inscrire*.`,
// 		`Une fois inscrit, il pourra se *connecter* et accéder aux fonctionnalités protégées. _(uniquement pour les rôles *ADMIN*)_`,
// 		"Le rôle par défaut est 'USER'.",
// 		`Voir **exemple 2** pour un utilisateur _ADMIN_`,
// 	], `[${AppConfig.getReadMeUrl(UserConfig.DocAnchors.register)}](${AppConfig.getReadMeUrl(UserConfig.DocAnchors.register)})`)
// 	}`,
// };
