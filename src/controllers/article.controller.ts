import { ArticleService } from "../services/article.service";

export class ArticleController {
	private articleService = new ArticleService();

	async getAllArticles() {
		return await this.articleService.getAllArticles();
	}

	async getArticleById(id: number) {
		return await this.articleService.getArticleById(id);
	}

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

	async updateArticleById(
		id: number,
		data: { title?: string; description?: string; content?: string },
	) {
		return await this.articleService.updateArticleById(id, data);
	}

	async deleteArticleById(id: number) {
		return await this.articleService.deleteArticleById(id);
	}
}
