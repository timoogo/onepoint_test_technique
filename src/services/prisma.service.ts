import { PrismaClient } from "@prisma/client";

/**
 * @class PrismaService
 * @description Service Singleton permettant de gérer une unique instance de PrismaClient
 * afin d'éviter les connexions multiples à la base de données.
 */
export class PrismaService {
	private static instance: PrismaService;
	private prisma: PrismaClient;

	/**
	 * @private
	 * @constructor
	 * @description Constructeur privé pour empêcher l'instanciation directe de la classe.
	 * Initialise PrismaClient.
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

	/**
	 * @method disconnect
	 * @description Ferme la connexion à la base de données Prisma.
	 * À appeler lors de l'arrêt de l'application pour éviter les fuites de connexion.
	 * @returns {Promise<void>}
	 */
	public async disconnect(): Promise<void> {
		await this.prisma.$disconnect();
	}
}
