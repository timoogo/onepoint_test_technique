import { FastifyInstance } from "fastify";
import { userDeleteRoutes } from "./user.delete.routes";
import { userGetRoutes } from "./user.get.routes";
import { userPostRoutes } from "./user.post.routes";

export async function UserRoutes(app: FastifyInstance) {
	const routes = [
		{ handler: userPostRoutes },
		{ handler: userGetRoutes },
		{ handler: userDeleteRoutes },
	];

	routes.forEach(({ handler }) => {
		app.register(handler, { prefix: "/users" });
	});
}
