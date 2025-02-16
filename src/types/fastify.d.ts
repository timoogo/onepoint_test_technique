import '@fastify/jwt';
import { User } from './user.type';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: User; 
    user: User;    
  }
}
