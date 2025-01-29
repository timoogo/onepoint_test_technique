import { User as GeneratedByPrismaUser } from "@prisma/client";

export type User = Omit<GeneratedByPrismaUser, "password">;
export type UserWithPassword = {
    id: number;
    email: string;
    name: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}