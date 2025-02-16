import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { publicRoutes } from "../config/app.config";
import { HttpMessages, HttpStatus } from "../config/http.config";

export class HookService {
    private static instance: HookService;

    private constructor() {} // Empêche l'instanciation directe

    static getInstance(): HookService {
        if (!this.instance) {
            this.instance = new HookService();
        }
        return this.instance;
    }

    registerAll(app: FastifyInstance) {
        this.registerOnRequest(app);
        this.registerOnSend(app);
        this.registerOnClose(app);
    }

    private registerOnRequest(app: FastifyInstance) {
        app.addHook("onRequest", async (request: FastifyRequest, reply: FastifyReply) => {

            // Ignorer toutes les routes Swagger et statiques
            if (request.url.startsWith("/docs")) return;
            const isPublicRoute = publicRoutes.some(
                (route) =>
                    request.raw.url?.startsWith(route.url) &&
                    (!route.method || request.method.toUpperCase() === route.method.toUpperCase()),
            );
    
            if (isPublicRoute) return;
            if (!request.headers.authorization) {
                request.log.warn(`Token missing for ${request.url}`);
                return reply.status(HttpStatus.UNAUTHORIZED).send({
                    status: "error",
                    message: "Missing token",
                });
            }
    
            try {
                await request.jwtVerify();
                request.log.info(`Token validated for ${request.url}`);
            } catch (error) {
                request.log.error(`Invalid token for ${request.raw.url}`, error);
                return reply.status(HttpStatus.UNAUTHORIZED).send({
                    status: "error",
                    message: "Invalid token or expired.",
                });
            }
        });
    
    }
    

    private registerOnSend(app: FastifyInstance) {
        app.addHook("onSend", async (request: FastifyRequest, reply: FastifyReply, payload) => {
            try {
                if (typeof payload === "string") return payload;
    
                if (typeof payload === "object" && reply.getHeader("content-type")?.toString().includes("application/json")) {
                    return JSON.stringify(payload);
                }
    
                return payload;
            } catch (error) {
                request.log.error("Error in onSend hook:", error);
                return payload;
            }
        });
    
    }
    

    private registerOnClose(app: FastifyInstance) {
        app.addHook("onClose", async () => {
            try {
                app.log.info("Closing database connection...");
                app.log.info("✅ Database connections closed successfully.");
                process.exit(0);
            } catch (error) {
                app.log.error("Error closing database connections:", error);
            }
        });
    }
}
