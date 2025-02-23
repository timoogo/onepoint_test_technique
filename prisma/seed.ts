import { PrismaClient } from "@prisma/client";
import { prismaService } from "../src/services/prisma.service";
import { articles, users } from "./resources.data";

const prisma = prismaService.getPrisma();
const modelKeys = ["User", "Article"]; // Respecte la casse de PostgreSQL

console.log("🧐 Model Keys:", modelKeys);

async function main() {
	try {
		console.log("🚀 Début du seed...");
		console.log("🧐 Model Keys:", modelKeys);

		// 🔄 Supprimer les données avec TRUNCATE CASCADE
		for (const resource of modelKeys) {
			console.log(`🔄 Nettoyage de la table ${resource}...`);
			await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${resource}" RESTART IDENTITY CASCADE`);
			console.log(`✨ Table ${resource} vidée avec succès`);
		}


		console.log("🧐 Users à insérer:", users.length);
		// 📝 Réinsertion des utilisateurs et articles
		await prisma.user.createMany({
			data: users,
			skipDuplicates: true,
		});
		const usersAfter = await prisma.user.findMany();

		console.log("🧐 Articles à insérer:", articles.length);
		await prisma.article.createMany({
			data: articles,
			skipDuplicates: true,
		});
		const articlesAfter = await prisma.article.findMany();
		console.log("📊 Résultats du seed :");
		console.table(usersAfter);
		console.table(articlesAfter);

		console.log("🎉 Seed terminé avec succès !");
	} catch (error) {
		console.error("❌ Erreur lors du seed :", error);
	} finally {
		await prismaService.disconnect();
		console.log("🛑 Prisma déconnecté proprement.");
	}
}

main();
