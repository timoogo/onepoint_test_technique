import dotenv from "dotenv";
import fastify, { FastifyInstance } from "fastify";
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
let serverInstance;
export { redisService };


export async function stopServer(): Promise<void> {
	await app.close();
}

export async function startServer(): Promise<FastifyInstance> {
	console.log("Starting server...");
    console.log("ENV:", process.env.NODE_ENV);

	try {
		if (process.env.NODE_ENV === "DEVELOPMENT") {
			console.log("Registering plugins...");
		}
		const pluginService = PluginService.getInstance();
		await pluginService.registerAll(app);

		if (process.env.NODE_ENV === "DEVELOPMENT") {
			console.log("Registering hooks...");
		}
		const hookService = HookService.getInstance();
		hookService.registerAll(app);

		if (process.env.NODE_ENV === "DEVELOPMENT") {
			console.log("Registering routes...");
		}
		await app.register(AuthRoutes);
		await app.register(UserRoutes);
		await app.register(ArticleRoutes);

		await app.ready();
		serverInstance = await app.listen({ port: PORT, host: "0.0.0.0" });
		console.log(`Server is running on http://localhost:${PORT}/docs`);
		return app;
	} catch (error) {
		if (process.env.NODE_ENV === "DEVELOPMENT") {
			console.error("Error starting the server:", error);
		} else {
			process.exit(1);
		}
		throw error; // Add return to satisfy TypeScript
	}
}

startServer();
