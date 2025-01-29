import '@fastify/jwt';
import { User } from './user.type';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: User; // Le type de charge utile (payload) dans le JWT
    user: User;    // Le type de `request.user` après validation
  }
}
