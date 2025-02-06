import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ArticleService {

	/**
	 * Récupérer tous les articles
	 */
	async getAllArticles() {
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

            // 🔹 S'assurer que `createdBy` est `null` au lieu d'`undefined`
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

	async countUnassignedArticles() {
		return await prisma.article.count({ where: { createdById: null } });
	}
}
