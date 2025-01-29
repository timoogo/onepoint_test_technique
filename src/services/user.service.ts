import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { UserWithPassword as SafeUser } from '../types/user.type';

const prisma = new PrismaClient();

export class UserService {
  /**
   * Créer un utilisateur
   * @param email L'adresse email de l'utilisateur
   * @param name Le nom de l'utilisateur
   * @param password Le mot de passe de l'utilisateur
   * @param role Le rôle de l'utilisateur (par défaut 'user')
   * @returns L'utilisateur créé
   */
  async createUser(email: string, name: string, password: string, role: string = 'user') {
    // Hachage du mot de passe
    const hashedPassword = await this.hashPassword(password);
    return await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          role,
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



  async getAllUsers(): Promise<SafeUser[]> {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      }, 
    });
  
    return users;
  }
  

  async getUserById(id: number): Promise<SafeUser | null> {
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
  
    return user; 
  }
  
  
}
