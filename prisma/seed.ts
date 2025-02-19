import { ModelKeys, PrismaService } from "../src/services/prisma.service";
import { articles, users } from "./resources.data";

const prisma = PrismaService.getInstance().getPrisma();

type Resource = {
	name: ModelKeys;
	data: any[];
	skipDuplicates?: boolean;
};

const modelKeys = PrismaService.getModelKeys();

async function createResource(
	resource: Resource,
	skipDuplicates: boolean = true,
) {
	if (!modelKeys.includes(resource.name)) {
		throw new Error(`Modèle invalide : ${String(resource.name)}`);
	}

	await (prisma[resource.name] as any).createMany({
		data: resource.data,
		skipDuplicates,
	});
}

async function main() {
	await createResource({
		name: "user",
		data: users,
	});

	await createResource({
		name: "article",
		data: articles,
	});
}

main()
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
