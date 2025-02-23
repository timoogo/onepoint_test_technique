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
		const prismaClient = PrismaService.getInstance().getPrisma();
		
		return Object.keys(prismaClient)
			.filter((key) => typeof (prismaClient as any)[key]?.create === "function") as ModelKeys[];
	}

	/**
	 * @method disconnect
	 * @description Ferme la connexion à la base de données Prisma.
	 */
	public async disconnect(): Promise<void> {
		await this.prisma.$disconnect();
	}
}


export async function countResource(resource: ModelKeys) {
    const prismaClient = prismaService.getPrisma();
	const delegate = prismaClient[resource] as unknown as {
        count: (args?: any) => Promise<number>;
    };
    return await delegate.count();
}



/**
 * 
 * Utilise `globalThis` pour éviter les multiples instances
 * en mode développement (utile avec `nodemon`).
 */
const prismaGlobal = globalThis as unknown as { prismaService?: PrismaService };

export const prismaService =
	prismaGlobal.prismaService ?? PrismaService.getInstance();

if (process.env.NODE_ENV !== "production") {
	prismaGlobal.prismaService = prismaService;
}
