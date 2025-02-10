import { FastifyInstance } from 'fastify';
import { userPostRoutes } from './user.post.routes';
import { userGetRoutes } from './user.get.routes';
import { ResponseHandler } from '../utils/response.handler';
import { userDeleteRoutes } from './user.delete.routes';
import { EnvironnementLevel } from '../config/environnement.config';
import { COLORS } from '../utils/colors.tui.utils';

export async function UserRoutes(app: FastifyInstance) {
  const routes = [
    { handler: userPostRoutes, description: "ajouts" },
    { handler: userGetRoutes, description: "récupérations" },
    { handler: userDeleteRoutes, description: "suppressions" },
  ];

  if (process.env.NODE_ENV === EnvironnementLevel.DEVELOPMENT) {
    console.group(COLORS.BLUE + "Enregistrement des routes utilisateur" + COLORS.RESET);
  }

  routes.forEach(({ handler, description }) => {
    if (process.env.NODE_ENV === EnvironnementLevel.DEVELOPMENT) {
      console.log(COLORS.GREEN + ` Routes liées aux ${description} enregistrées` + COLORS.RESET);
    }
    app.register(handler, { prefix: "/users" });
  });

  if (process.env.NODE_ENV === EnvironnementLevel.DEVELOPMENT) {
    console.groupEnd();
    console.log(COLORS.BLUE + "Toutes les routes utilisateur ont été enregistrées avec succès !" + COLORS.RESET);
  }
}