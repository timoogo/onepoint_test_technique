import { Article } from "@prisma/client";
import { PrismaService } from "./prisma.service";

const prisma = PrismaService.getInstance().getPrisma();

/**
 * Service gérant les opérations CRUD sur les articles
 * @class ArticleService
 */
export class ArticleService {

	/**
	 * Récupérer tous les articles, avec tous les champs 
	 * @returns Promise<>
	 * {
	 * 	status: [success, error],
	 * 	message: [message de succès ou d'erreur],
	 * 	data: [...articles],
	 * }
	 * 	 * Si des articles n'ont pas de créateur, les champs `createdBy` et `createdById` seront `null`
	 * 	 * Si des articles ont un créateur, les champs `createdBy` et `createdById` seront renseignés
	 */
	async getAllArticles(): Promise<Article[]> {
        try {
            const articles = await prisma.article.findMany({
                select: {
                    id: true,
                    title: true,
                    description: true,
                    content: true,
                    createdAt: true,
                    updatedAt: true,
                    createdById: true,
                    createdBy: {
                        select: { id: true, name: true, email: true },
                    },
                },
            });
            return articles.map(article => ({
                ...article,
                createdBy: article.createdBy ?? null,
            }));

        } catch (error) {
            console.error("❌ Erreur lors de la récupération des articles :", error);
            throw new Error("Impossible de récupérer les articles.");
        }
    }

	/**
	 * Récupérer un article par son ID
	 */
	async getArticleById(id: number) {
		return prisma.article.findUnique({
			where: { id },
			include: {
				createdBy: {
					select: { id: true, name: true, email: true },
				},
			},
		});
	}

	/**
	 * Créer un nouvel article
	 */
	async createArticle(
		title: string,
		description: string,
		content: string,
		createdById: number,
	) {
		return prisma.article.create({
			data: {
				title,
				description,
				content,
				createdById,
			},
		});
	}

	/**
	 * Mettre à jour un article par son ID
	 */
	async updateArticleById(
		id: number,
		data: { title?: string; description?: string; content?: string },
	) {
		return prisma.article.update({
			where: { id },
			data,
		});
	}

	/**
	 * Réassigner les articles d'un utilisateur à un autre.
	 * Utile lors d'une suppression d'utilisateur. La logique n'est pas implémentée pour le moment, la réassignation est à faire manuellement.
	 */
	async reassignArticles(oldUserId: number | null, newUserId: number) {
		return await prisma.article.updateMany({
			where: { createdById: oldUserId }, // Supporte null
			data: { createdById: newUserId },
		});
	}

	/**
	 * Supprimer un article par son ID
	 */
	async deleteArticleById(id: number) {
		return prisma.article.delete({
			where: { id },
		});
	}

	/**
	 * Compter le nombre d'articles non assignés
	 */
	async countUnassignedArticles() {
		return await prisma.article.count({ where: { createdById: null } });
	}
}
