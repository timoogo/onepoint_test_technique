import { UserConfig, UserRoles } from "../config/user.config";
import { PrismaService } from "../services/prisma.service";

export class ExampleGenerator {

    static prisma = PrismaService.getInstance().getPrisma(); // ✅ Initialisation correcte


    private static getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private static generateStrongRandomPassword() {

const majuscules = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const minuscules = 'abcdefghijklmnopqrstuvwxyz';
    const chiffres = '0123456789';
    const speciaux = '!@#$%^&*';

    const password = [
        majuscules[Math.floor(Math.random() * majuscules.length)],
        minuscules[Math.floor(Math.random() * minuscules.length)],
        chiffres[Math.floor(Math.random() * chiffres.length)],
        speciaux[Math.floor(Math.random() * speciaux.length)],
    ];

    while (password.length < UserConfig.PASSWORD_LENGTH.MIN) {
        const chars = majuscules + minuscules + chiffres + speciaux;
            password.push(chars[Math.floor(Math.random() * chars.length)]);
        }

        return password.join("");
    }

    static generateUserExample(role: "USER" | "ADMIN") {
        const randomNum = this.getRandomInt(1, 1000);
        return {
            name: `Utilisateur Test ${randomNum}`,
            email: `utilisateur${randomNum}@example.com`,
            password: this.generateStrongRandomPassword(),
            role: role === "ADMIN" ? UserRoles.ADMIN : UserRoles.USER,
        };
    }

    static generateArticleExample() {
        const randomNum = this.getRandomInt(1, 1000);
        return {
            title: `Titre de l'article ${randomNum}`,
            description: `Description de l'article ${randomNum}`,
            content: `Contenu de l'article ${randomNum}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
    }
    static generateMultipleArticleExamples(count = 3) {
        return Array.from({ length: count }, () => this.generateArticleExample());
    }
    
    



    static async generateReassignExample() {
        if (!ExampleGenerator.prisma) {
            throw new Error("❌ Prisma n'est pas initialisé dans ExampleGenerator !");
        }

        // ✅ Utilisation correcte de `ExampleGenerator.prisma`
        const article = await ExampleGenerator.prisma.article.findFirst();
        const users = await ExampleGenerator.prisma.user.findMany({ take: 2 });
        

        if (!article || users.length < 2) {
            throw new Error("❌ Impossible de générer l'exemple de réattribution : pas assez de données.");
        }

        return {
            oldUserId: article.createdById,
            newUserId: users[1].id,
        };
    }
}


