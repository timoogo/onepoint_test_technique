import fastify from "fastify";
import dotenv from "dotenv";
import { AuthRoutes } from "./routes/auth.routes";
import { UserRoutes } from "./routes/user.routes";
import { ArticleRoutes } from "./routes/article.routes";
import { HookService } from "./services/hook.service";
import { PluginService } from "./services/plugin.service";
import { RedisDebugService } from "./services/redis.debug.service";
import { RedisService } from "./services/redis.service";

dotenv.config();

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const app = fastify({ logger: false });

const redisService = process.env.NODE_ENV === "development" ? new RedisDebugService() : new RedisService();

export { redisService };

async function startServer() {
    try {
        const pluginService = PluginService.getInstance();
        await pluginService.registerAll(app); // 📌 Enregistre tous les plugins
		

        const hookService = HookService.getInstance();
        hookService.registerAll(app); // 📌 Enregistre tous les hooks

        app.register(AuthRoutes);
        app.register(UserRoutes);
        app.register(ArticleRoutes);

        await app.listen({ port: PORT, host: "0.0.0.0" });
        console.log(`🚀 Serveur en écoute sur http://localhost:${PORT}/docs`);
    } catch (error) {
        console.error("❌ Erreur au démarrage du serveur :", error);
        process.exit(1);
    }
}

startServer();
