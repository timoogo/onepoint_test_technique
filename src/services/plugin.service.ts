import { FastifyInstance } from "fastify";
import jwt from "@fastify/jwt";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import dotenv from "dotenv";
import { SecurityConfig } from "../config/security.config";
import { ResponseHandler } from "../utils/response.handler";

dotenv.config();

export class PluginService {
    private static instance: PluginService;

    private constructor() {} // Empêche l'instanciation directe

    static getInstance(): PluginService {
        if (!this.instance) {
            this.instance = new PluginService();
        }
        return this.instance;
    }

    async registerAll(app: FastifyInstance) {
        await this.registerJWT(app);
        await this.registerSwagger(app);
        console.log("✅ Tous les plugins ont été enregistrés avec succès !");
    }

    private async registerJWT(app: FastifyInstance) {
        ResponseHandler.debug("🔑 Enregistrement du plugin JWT...", {
            data: {
                expiresIn: process.env.JWT_EXPIRES_IN || "1h",
                secret: process.env.JWT_SECRET || "supersecret"
            }
        });
        app.register(jwt, {
            sign: { expiresIn: process.env.JWT_EXPIRES_IN || "1h" },
            secret: process.env.JWT_SECRET || "supersecret",
        });
        console.log("🔑 Plugin JWT enregistré");
    }

    private async registerSwagger(app: FastifyInstance) {
        app.register(swagger, {
            openapi: {
                info: {
                    title: "API de gestion des articles",
                    description: "Documentation de l'API",
                    version: "1.0.0",
                    contact: {
                        name: "Timothée Gaultier",
                        email: "timothee.gaultier.pro@gmail.com",
                        url: "https://github.com/timoogo",
                        
                    }
                },
                components: {
                    securitySchemes: {
                        BearerAuth: {
                            type: "http",
                            scheme: "bearer",
                        },
                    },
                },
                security: SecurityConfig.PUBLIC_ROUTE,
            },
        });

        app.register(swaggerUi, {
            routePrefix: "/docs",
            uiConfig: {
                docExpansion: "list",
                deepLinking: true,
            },
            staticCSP: true,
            transformSpecification: (swaggerObject) => swaggerObject,
        });

        console.log("📜 Plugin Swagger enregistré");
    }
}
