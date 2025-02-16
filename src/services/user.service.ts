import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { UserWithPassword as SafeUser } from "../types/user.type";
import { PrismaService } from "./prisma.service";

const prisma = PrismaService.getInstance().getPrisma();

export class UserService {
	/**
	 * Créer un utilisateur
	 * @param email L'adresse email de l'utilisateur
	 * @param name Le nom de l'utilisateur
	 * @param password Le mot de passe de l'utilisateur
	 * @param role Le rôle de l'utilisateur (par défaut 'user')
	 * @returns L'utilisateur créé
	 */
	async createUser(
		name: string,
		email: string,
		password: string,
		role: string = "user",
	) {
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});
		if (existingUser) {
			throw new Error("Cet email est déjà utilisé.");
		}

		// Hachage du mot de passe
		const hashedPassword = await this.hashPassword(password);

		return await prisma.user.create({
			data: {
				email,
				name,
				password: hashedPassword,
				role: role || this.getDefaultRole(),
			},
		});
	}

	/**
	 * Hacher un mot de passe avec bcrypt
	 * @param password Le mot de passe en clair
	 * @returns Le mot de passe haché
	 */
	private async hashPassword(password: string): Promise<string> {
		const saltRounds = 10;
		return bcrypt.hash(password, saltRounds);
	}

	async getPaginatedUsers(limit: number, offset: number): Promise<SafeUser[]> {
		const users = await prisma.user.findMany({
			select: {
				id: true,
				email: true,
				name: true,
				role: true,
				createdAt: true,
				updatedAt: true,
			},
			skip: offset,
			take: limit,
		});

		return users;
	}

	async getUserById(id: number): Promise<Omit<User, "password"> | null> {
		const user = await prisma.user.findUnique({
			where: { id },
			select: {
				id: true,
				email: true,
				name: true,
				role: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		if (!user) {
			return null;
		}

		return user;
	}

	private getDefaultRole(): string {
		return "user";
	}

	async deleteUserById(id: number): Promise<User | null> {
		const existingUser = await prisma.user.findUnique({ where: { id } });
		if (!existingUser) {
			return null; // ✅ Retourne null si l'utilisateur n'existe pas
		}

		await prisma.user.update({
			where: { id },
			data: { updatedAt: new Date() },
		});

		return await prisma.user.delete({ where: { id } }); // ✅ Retourne l'utilisateur supprimé
	}

	async countUsers(): Promise<number> {
		return await prisma.user.count();
	}
}
