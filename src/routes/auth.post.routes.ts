import dotenv from "dotenv";
import { FastifyInstance } from "fastify";
import { AuthController } from "../controllers/auth.controller";
import { LoginDto } from "../dtos/login.dto";
import { loginModel, loginResponseModel } from "../models/auth.models";

dotenv.config();

export async function AuthPostRoutes(app: FastifyInstance) {
	const authController = new AuthController();
	// Route de connexion
	app.post<{ Body: LoginDto }>(
		"/login",
		{
			schema: {
				description: "Authentification et génération d'un token JWT",
				tags: ["Auth"],
				body: loginModel,
				response: {
					200: loginResponseModel,
					401: {
						type: "object",
						properties: {
							message: {
								type: "string",
								description:
									"Message d'erreur en cas d'identifiants incorrects",
							},
						},
					},
				},
			},
		},
		(req, reply) => authController.login(req, reply), // Ici, on passe `app`
	);
	// Route de déconnexion
	app.post(
		"/logout",

		{
			schema: {
				description: "Déconnexion de l'utilisateur",
				tags: ["Auth"],
				response: {
					200: {
						type: "object",
						properties: {
							message: { type: "string", description: "Message de succès" },
						},
					},
					500: {
						type: "object",
						properties: {
							error: {
								type: "string",
								description: "Message d'erreur en cas de problème",
							},
						},
					},
				},
			},
		},
		authController.logout.bind(authController),
	);
}
