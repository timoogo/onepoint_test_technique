import { ArticleService } from "../services/article.service";
/**
 * Contrôleur gérant les opérations CRUD sur les articles
 * @class ArticleController
 */

export class ArticleController {
	/**
	 * Le service controlant les opérations CRUD sur les articles. C'est lui qui fait les requêtes à la base de données.
	 * @private
	 */
	private articleService = new ArticleService();

	/**
	 * Récupère tous les articles
	 * @returns Liste des articles
	 */
	async getAllArticles() {
		return await this.articleService.getAllArticles();
	}

	/**
	 * Récupère un article par son ID
	 * @param id L'ID de l'article à récupérer
	 * @returns L'article trouvé
	 */
	async getArticleById(id: number) {
		return await this.articleService.getArticleById(id);
	}

	/**
	 * Crée un nouvel article
	 * @param title Le titre de l'article
	 * @param description La description de l'article
	 * @param content Le contenu de l'article
	 * @param createdById L'ID de l'utilisateur créant l'article
	 * @returns L'article créé
	 */
	async createArticle(
		title: string,
		description: string,
		content: string,
		createdById: number,
	) {
		return await this.articleService.createArticle(
			title,
			description,
			content,
			createdById,
		);
	}

	/**
	 * Met à jour un article existant par son ID
	 * @param id L'ID de l'article à mettre à jour
	 * @param data Les données à mettre à jour (titre, description, contenu)
	 * @returns L'article mis à jour
	 */
	async updateArticleById(
		id: number,
		data: { title?: string; description?: string; content?: string },
	) {
		return await this.articleService.updateArticleById(id, data);
	}

	/**
	 * Supprime un article par son ID
	 * @param id L'ID de l'article à supprimer
	 * @returns L'article supprimé
	 */
	async deleteArticleById(id: number) {
		return await this.articleService.deleteArticleById(id);
	}


	/** 
	 * Retourne les articles paginés
	*/
    async getPaginatedArticles(limit: number, offset: number) {
		return await this.articleService.getPaginatedArticles(limit, offset);
    }
}
