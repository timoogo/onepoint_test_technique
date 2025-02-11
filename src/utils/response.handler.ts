import { FastifyRequest } from "fastify";
import { EnvironnementLevel } from "../config/environnement.config";
import { COLORS } from "./colors.tui.utils";

export class ResponseHandler {
	/**
	 * Définit l'ordre des niveaux de log pour la hiérarchie
	 */
	private static readonly logLevels = ["DEBUG", "INFO", "SUCCESS", "ERROR"];

	/**
	 * Log d'information standardisé
	 */
	static info(
		message: string,
		context: any = null,
		request?: FastifyRequest,
		config?: { minimalLogLevel: string },
	) {
		if (!ResponseHandler.shouldLog("INFO", config)) return;
		ResponseHandler.log(
			"INFO",
			message,
			COLORS.CYAN,
			context ?? undefined,
			request,
		);
	}

	/**
	 * Log de succès
	 */
	static success(
		message: string,
		context: any = null,
		request?: FastifyRequest,
		config?: { minimalLogLevel: string },
	) {
		if (!ResponseHandler.shouldLog("SUCCESS", config)) return;
		ResponseHandler.log(
			"SUCCESS",
			message,
			COLORS.GREEN,
			context ?? undefined,
			request,
		);
	}

	/**
	 * Log d'erreur
	 */
  static error(
    message: string,
    error?: any,
    request?: FastifyRequest,
    config?: { minimalLogLevel: string; trace?: boolean }
) {
    if (!ResponseHandler.shouldLog("ERROR", config)) return;

    const errorMessage = error instanceof Error ? error.message : error;
    const errorStack = error instanceof Error && config?.trace !== false ? error.stack : undefined;

    ResponseHandler.log("ERROR", message, COLORS.RED, { message: errorMessage, stack: errorStack }, request, config?.trace);
}


	/**
	 * Log de debug avancé
	 */
	static debug(
		message: string,
		options?: {
			context?: any;
			request?: FastifyRequest;
			data?: any;
			trace?: boolean;
			config?: { minimalLogLevel: string };
		},
	) {
		const {
			context = null,
			request = undefined,
			data = null,
			trace = true,
			config,
		} = options || {};
		if (!ResponseHandler.shouldLog("DEBUG", config)) return;

		const logContext = context ?? undefined;
		const logData = data ?? undefined;

		ResponseHandler.log(
			"DEBUG",
			message,
			COLORS.MAGENTA,
			{ context: logContext, data: logData },
			request,
			trace,
		);
	}

	/**
	 * Vérifie si le log doit être affiché en fonction du `minimalLogLevel`
	 */
	private static shouldLog(
		level: string,
		config?: { minimalLogLevel: string },
	): boolean {
		if (process.env.NODE_ENV !== EnvironnementLevel.DEVELOPMENT) return false;

		const moduleLevel = config?.minimalLogLevel || "DEBUG";
		return (
			ResponseHandler.logLevels.indexOf(level) >=
			ResponseHandler.logLevels.indexOf(moduleLevel)
		);
	}

	/**
	 * Log générique utilisé par les méthodes publiques
	 */
  private static log(
    level: string,
    message: string,
    color: string,
    context: any = null,
    request?: FastifyRequest,
    trace: boolean = false,
) {
    const timestamp = new Date().toISOString().replace("T", " ").split(".")[0];
    const method = request?.method || "N/A";
    const url = request?.url || "N/A";
    const logPrefix = `[${level.toUpperCase()}] ${timestamp} | ${method} ${url}`;

    console.log(`${COLORS.BLUE}\n_______ ${method} ${url} _______${COLORS.RESET}`);
    console.log(`${color}${logPrefix}${COLORS.RESET}`);

    // Ajout de la trace de l'appel (uniquement en mode DEBUG)
    if (level === "DEBUG" && trace) {
        const stackTrace = new Error().stack?.split("\n")[3] || "N/A";
        const callerInfo = stackTrace.match(/(?:\s*at\s+)?(.*\/src\/.*?):(\d+):\d+\)?/);
        if (callerInfo) {
            const filePath = callerInfo[1].replace(process.cwd(), "").replace(/^\//, "").trim();
            const lineNumber = callerInfo[2];
            console.log(`${COLORS.MAGENTA}[DEBUG|TRACE] ${timestamp} | ${filePath}:${lineNumber}${COLORS.RESET}`);
        }
    }

    // ✅ Vérifier si `context` est bien un objet avant d'utiliser `Object.keys()`
    if (context && typeof context === "object" && Object.keys(context).length > 0) {
        console.log(`${color}${message}${COLORS.RESET}`, context);
    } else {
        console.log(`${color}${message}${COLORS.RESET}`);
    }

    console.log(`${COLORS.BLUE}_______ END ${method} ${url} _______${COLORS.RESET}\n`);
}



}
