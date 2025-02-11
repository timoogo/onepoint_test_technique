import { AuthDocExamples } from "../docs/auth.doc.examples";
import { AuthMessages } from "../messages/auth.messages";
import { AuthSchemas } from "../schemas/auth.schemas";
import { ConfigBase } from "./config.base";

export class AuthConfig extends ConfigBase {
	// 📌 Paramètres de sécurité pour l'authentification
	static readonly MIN_PASSWORD_LENGTH = 8;
	static readonly MAX_PASSWORD_LENGTH = 64;
	static readonly TOKEN_EXPIRATION = "1h";
	static readonly REFRESH_TOKEN_EXPIRATION = "7d";

	// ✅ Messages liés à l’authentification
	static readonly Messages = AuthMessages;

	// ✅ Schémas OpenAPI pour Swagger
	static readonly Schemas = AuthSchemas;

	// ✅ Exemples de documentation
	static readonly DocExamples = AuthDocExamples;
}
