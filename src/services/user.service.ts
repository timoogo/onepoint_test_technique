import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

export const createUser = async (email: string, name: string, password: string, role: string = 'user') => {
  // Hachage du mot de passe avant stockage
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role,
    },
  });
};
