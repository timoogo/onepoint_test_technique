import { Article, User } from "@prisma/client";
import { PrismaService } from "../src/services/prisma.service";

const prisma = PrismaService.getInstance().getPrisma();

async function main() {
    const users: User[] = [
        {
            email: "admin@example.com",
            name: "Admin",
            password: "password",
            role: "ADMIN",
            createdAt: new Date(),
            updatedAt: new Date(),
            id: 1,
        },
        {
            email: "user@example.com",
            name: "User",
            password: "password",
            role: "USER",
            createdAt: new Date(),
            updatedAt: new Date(),
            id: 2,
        },
    ];

    const articles: Article[] = [
        {
            title: "Article 1",
            description: "Description 1",
            content: "Content 1",
            createdAt: new Date(),
            updatedAt: new Date(),
            id: 1,
            createdById: 1,
        },
        {
            title: "Article 2",
            description: "Description 2",
            content: "Content 2",
            createdAt: new Date(),
            updatedAt: new Date(),
            id: 2,
            createdById: 2,
        },
    ];

    await prisma.user.createMany({
        data: users,
    });

    await prisma.article.createMany({
        data: articles,
    });

    console.log("Database seeded successfully");

}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });