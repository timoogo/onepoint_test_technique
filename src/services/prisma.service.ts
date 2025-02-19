import { PrismaClient } from "@prisma/client";

/**
 * @class PrismaService
 * @description Service Singleton permettant de gérer une unique instance de PrismaClient,
 * même avec Nodemon (via globalThis).
 */

export type ModelKeys = Exclude<keyof PrismaClient, `$${string}`>; // Exclut les méthodes système
export class PrismaService {
	private static instance: PrismaService;
	private prisma: PrismaClient;

	/**
	 * @private
	 * @constructor
	 * @description Constructeur privé pour empêcher l'instanciation directe.
	 */
	private constructor() {
		this.prisma = new PrismaClient();
	}

	/**
	 * @static
	 * @method getInstance
	 * @description Retourne l'instance unique de `PrismaService` (Singleton).
	 * @returns {PrismaService} L'unique instance de `PrismaService`.
	 */
	public static getInstance(): PrismaService {
		if (!PrismaService.instance) {
			PrismaService.instance = new PrismaService();
		}
		return PrismaService.instance;
	}

	/**
	 * @method getPrisma
	 * @description Retourne l'instance unique de PrismaClient.
	 * @returns {PrismaClient} Instance de PrismaClient.
	 */
	public getPrisma(): PrismaClient {
		return this.prisma;
	}

	public static getModelKeys(): ModelKeys[] {
		return Object.keys(PrismaService.getInstance().getPrisma()) as ModelKeys[];
	}


	/**
	 * @method disconnect
	 * @description Ferme la connexion à la base de données Prisma.
	 */
	public async disconnect(): Promise<void> {
		await this.prisma.$disconnect();
	}
}

/**
 * Utilise `globalThis` pour éviter les multiples instances
 * en mode développement (utile avec `nodemon`).
 */
const prismaGlobal = globalThis as unknown as { prismaService?: PrismaService };

export const prismaService =
	prismaGlobal.prismaService ?? PrismaService.getInstance();

if (process.env.NODE_ENV !== "production") {
	prismaGlobal.prismaService = prismaService;
}
