import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ArticleService {
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
    createdById: number
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
  async updateArticle(
    id: number,
    data: { title?: string; description?: string; content?: string }
  ) {
    return prisma.article.update({
      where: { id },
      data,
    });
  }

  /**
   * Supprimer un article par son ID
   */
  async deleteArticle(id: number) {
    return prisma.article.delete({
      where: { id },
    });
  }
}
