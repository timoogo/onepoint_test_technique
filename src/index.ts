import dotenv from "dotenv";
import fastify from "fastify";
import { ArticleRoutes } from "./routes/article.routes";
import { AuthRoutes } from "./routes/auth.routes";
import { UserRoutes } from "./routes/user.routes";
import { HookService } from "./services/hook.service";
import { PluginService } from "./services/plugin.service";
import { RedisService } from "./services/redis.service";

dotenv.config();

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const app = fastify({ logger: false });

const redisService = new RedisService();

export { redisService };

async function startServer() {
    try {
        const pluginService = PluginService.getInstance();
        await pluginService.registerAll(app); 
		

        const hookService = HookService.getInstance();
        hookService.registerAll(app);

        for (const route of [AuthRoutes, UserRoutes, ArticleRoutes]) {
            app.register(route);
        }

        await app.listen({ port: PORT, host: "0.0.0.0" });
        console.log(`Server is running on http://localhost:${PORT}/docs`);
    } catch (error) {
        console.error("Error starting the server:", error);
        process.exit(1);
    }
}

startServer();
