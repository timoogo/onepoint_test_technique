import { User } from "@prisma/client";
import { UserService } from "../services/user.service";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { FastifyRequest, FastifyReply } from "fastify";

/**
 * Controller pour les opérations liées aux utilisateurs
 */
export class UserController {
	private userService = new UserService();

	/**
	 * Créer un nouvel utilisateur
	 * @param name - Nom de l'utilisateur
	 * @param email - Email de l'utilisateur
	 * @param password - Mot de passe de l'utilisateur
	 * @param role - Rôle de l'utilisateur
	 * @returns Promise<User> Utilisateur créé
	 */
  async createUser(dto: CreateUserDTO): Promise<User> {
    return await this.userService.createUser(dto.email, 
      dto.name, 
      dto.password, 
      dto.role || 'user');
	}

	/**
	 * Récupérer tous les utilisateurs
	 * @returns Promise<Omit<User, 'password'>[]> Liste de tous les utilisateurs sans le mot de passe
	 */
	async getPaginatedUsers(
		limit: number,
		offset: number,
	): Promise<Omit<User, "password">[]> {
		return await this.userService.getPaginatedUsers(limit, offset);
	}

	/**
	 * Récupérer un utilisateur par son ID
	 * @param id - ID de l'utilisateur à récupérer
	 * @returns Promise<Omit<User, 'password'>> Utilisateur récupéré
	 */
  async getUserById(id: number): Promise<Omit<User, 'password'>> {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
}
	/**
	 * Supprimer un utilisateur par son ID
	 * @param id - ID de l'utilisateur à supprimer
	 * @returns Promise<void>
	 */
	async deleteUserById(id: number): Promise<void> {
		console.log("Controller@deleteUserById", id);
		await this.userService.deleteUserById(id);
	}
}
