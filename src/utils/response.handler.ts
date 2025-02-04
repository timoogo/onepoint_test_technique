import { FastifyRequest } from "fastify";
import { EnvironnementLevel } from "../config/environnement.config";

  export class ResponseHandler {
    /**
     * Log d'information standardisé
     */
    static info(message: string, context: any = null, request?: FastifyRequest) {
      if (process.env.ENVIRONNEMENT_LEVEL === EnvironnementLevel.DEVELOPMENT) {
        const logMessage = ResponseHandler.formatLog("INFO", request);
        console.log(logMessage, message, context || "");
      }
    }

    /**
     * Log de succès (sans envoyer de réponse HTTP)
     */
    static success(
      message: string,
      context: any = null,
      request?: FastifyRequest,
    ) {
      if (process.env.ENVIRONNEMENT_LEVEL === EnvironnementLevel.DEVELOPMENT) {
        const logMessage = ResponseHandler.formatLog("SUCCESS", request);
        console.log(logMessage, message, context || "");
      }
    }

    /**
     * Log d'erreur (sans envoyer de réponse HTTP)
     */
    static error(message: string, error?: any, request?: FastifyRequest) {
      const logMessage = ResponseHandler.formatLog("ERROR", request);
      console.error(logMessage, message, error || "");
    }

    static debug(
      message: string, 
      options?: { 
        context?: any; 
        request?: FastifyRequest; 
        data?: any; 
        level?: "INFO" | "WARN" | "ERROR" | "DEBUG";
      }
    ) {
      const {
        context = null, 
        request = undefined, 
        data = null, 
        level = "DEBUG" // Par défaut, c'est un log de debug
      } = options || {}; 
    
      const logMessage = ResponseHandler.formatLog(`[${level}]`, request);
      console.log(logMessage, message, context || "", data || "");
    }
    

    /**
     * Formate le log avec la source du fichier et la requête associée
     */
    private static formatLog(level: string, request?: FastifyRequest): string {
      const timestamp = new Date().toISOString().replace("T", " ").split(".")[0];

      const method = request?.method || "N/A";
      const url = request?.url || "N/A";

      return `\n_______ ${method} ${url} _______\n[${level.toUpperCase()}] ${timestamp} | ${method} ${url}\n___________`;
    }
  }
