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
        console.log("✅ Tous les hooks Fastify ont été enregistrés !");
    }

    private registerOnRequest(app: FastifyInstance) {
        app.addHook("onRequest", async (request: FastifyRequest, reply: FastifyReply) => {
            const isPublicRoute = publicRoutes.some(
                (route) =>
                    request.raw.url?.startsWith(route.url) &&
                    (!route.method || request.method.toUpperCase() === route.method.toUpperCase()),
            );
    
            if (isPublicRoute) {
                request.log.info(`🔓 Route publique : ${request.url}`);
                return;
            }
    
            if (!request.headers.authorization) {
                request.log.warn(`🚨 Token manquant pour ${request.url}`);
                return reply.status(HttpStatus.UNAUTHORIZED).send({
                    status: "error",
                    message: "Token manquant",
                });
            }
    
            try {
                await request.jwtVerify();
                request.log.info(`✅ Token valide pour ${request.url}`);
            } catch (error) {
                request.log.error(`🚨 Token invalide pour ${request.raw.url}`, error);
                return reply.status(HttpStatus.UNAUTHORIZED).send({
                    status: "error",
                    message: "Token invalide ou expiré.",
                });
            }
        });
    
        console.log("🛡️ Hook `onRequest` enregistré");
    }
    

    private registerOnSend(app: FastifyInstance) {
        app.addHook("onSend", async (request: FastifyRequest, reply: FastifyReply, payload) => {
            try {
                if (typeof payload === "string") {
                    return payload; // ✅ Si c'est déjà une chaîne, on retourne tel quel
                }
    
                if (typeof payload === "object") {
                    return JSON.stringify(payload); // ✅ Transformer l'objet en JSON string
                }
    
                return payload; // ✅ Autres types inchangés
            } catch (error) {
                request.log.error("⚠️ Erreur dans le hook onSend :", error);
                return payload;
            }
        });
    
        console.log("📦 Hook `onSend` enregistré");
    }
    

    private registerOnClose(app: FastifyInstance) {
        app.addHook("onClose", async () => {
            try {
                app.log.info("🔌 Fermeture de la connexion à la base de données...");
                // Ici tu peux ajouter la déconnexion de tes services si nécessaire
                app.log.info("✅ Connexions fermées avec succès.");
            } catch (error) {
                app.log.error("❌ Erreur lors de la fermeture des connexions :", error);
            }
        });

        console.log("🔚 Hook `onClose` enregistré");
    }
}
