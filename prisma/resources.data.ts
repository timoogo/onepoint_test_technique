import { Article, User } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import * as UserConfig from "../src/config/user.config";
const hashPasswordSync = (password: string): string => {
	return bcrypt.hashSync(password, 10);
};
type CreateUser = Omit<User, "id">;
type CreateArticle = Omit<Article, "id">;

const users: CreateUser[] = [
	{
		email: "admin@example.com",
		name: "Admin",
		password: hashPasswordSync("SuperSecureP@ss123"), // plus d'async ici
		role: UserConfig.UserRoles.ADMIN,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		email: "user@example.com",
		name: "User",
		password: hashPasswordSync("MotDePasseSecurisé123!"),
		role: UserConfig.UserRoles.USER,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];

const articles: CreateArticle[] = [
	{
		title: "Article 1",
		description: "Description 1",
		content: "Content 1",
		createdAt: new Date(),
		updatedAt: new Date(),
		createdById: 1,
	},
	{
		title: "Article 2",
		description: "Description 2",
		content: "Content 2",
		createdAt: new Date(),
		updatedAt: new Date(),
		createdById: 2,
	},
];

export { articles, users };
