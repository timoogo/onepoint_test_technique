import { exec } from "child_process";

export const runMigrations = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        console.log("🚀 Exécution des migrations Prisma...");
        exec("npx prisma migrate dev --name init", (error, stdout, stderr) => {
            if (error) {
                console.error(`❌ Erreur lors de l'exécution des migrations :`, error);
                return reject(error);
            }
            console.log(stdout);
            console.log("✅ Migrations appliquées avec succès !");
            resolve();
        });
    });
};
