import { Article, User } from "@prisma/client";

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

export { users, articles };
