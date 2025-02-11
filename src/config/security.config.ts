export class SecurityConfig {
	static readonly SECURED_ROUTE = [{ BearerAuth: [] }];
	static readonly PUBLIC_ROUTE = [];

	/**
	 * Retourne la configuration de sécurité pour une route sécurisée (nécessitant une authentification)
	 */
	static getSecuredRoute() {
		return this.SECURED_ROUTE;
	}

	/**
	 * Retourne la configuration de sécurité pour une route publique (sans authentification)
	 */
	static getPublicRoute() {
		return this.PUBLIC_ROUTE;
	}
}
