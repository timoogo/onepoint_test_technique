import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ArticleService {
	static readonly TITLE_LENGTH = {
		MIN: 5,
		MAX: 100,
	};
	static readonly DESCRIPTION_LENGTH = {
		MIN: 10,
		MAX: 250,
	};
	static readonly CONTENT_LENGTH = {
		MIN: 10,
		MAX: 10000,
	};

	/**
	 * Récupérer tous les articles
	 */
	async getAllArticles() {
		return prisma.article.findMany({
			include: {
				createdBy: {
					select: { id: true, name: true, email: true },
				},
			},
		});
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
