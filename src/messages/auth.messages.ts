import fs from "fs";
import path from "path";

export const AuthMessages = {
	EMAIL_REQUIRED: "L'email est obligatoire",
	EMAIL_INVALID: "L'email n'est pas valide",
	PASSWORD_REQUIRED: "Le mot de passe est obligatoire",
	PASSWORD_LENGTH: `Le mot de passe doit contenir entre 8 et 64 caractères`,
	PASSWORD_WEAK: "Le mot de passe est trop faible",
	AUTH_FAILED: "Échec d'authentification, vérifiez vos identifiants",
	TOKEN_INVALID: "Token invalide ou expiré",
	TOKEN_REQUIRED: "Un token est requis",
	REFRESH_TOKEN_INVALID: "Le refresh token est invalide ou expiré",

	LOGIN_DESCRIPTION: fs.readFileSync(
		path.join(__dirname, "../messages/swagger/login.md"),
		"utf8",
	),

	LOGOUT_DESCRIPTION: fs.readFileSync(
		path.join(__dirname, "../messages/swagger/logout.md"),
		"utf8",
	),

	LOGOUT_SUMMARY: "Déconnexion de l'utilisateur",
	LOGIN_SUMMARY: "Connexion de l'utilisateur",
};
