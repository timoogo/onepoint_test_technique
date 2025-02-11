import dotenv from "dotenv";
import { FastifyInstance } from "fastify";
import { AuthConfig } from "../config/auth.config";
import { AuthController } from "../controllers/auth.controller";
import { LoginDto } from "../dtos/login.dto";

dotenv.config();

export async function AuthPostRoutes(app: FastifyInstance) {
    const authController = new AuthController();

    // ✅ Route de connexion
    app.post<{ Body: LoginDto }>(
        "/login",
        {
            schema: AuthConfig.Schemas.Login, // ✅ Centralisé dans `AuthConfig`
        },
        (req, reply) => authController.login(req, reply),
    );

    // ✅ Route de déconnexion
    app.post(
        "/logout",
        {
            schema: AuthConfig.Schemas.Logout, // ✅ Centralisé dans `AuthConfig`
        },
        authController.logout.bind(authController), // ✅ Évite les erreurs de contexte
    );
}
