import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { loginModel, loginResponseModel } from '../models/auth.models';
import dotenv from 'dotenv';

export async function authRoutes(app: FastifyInstance) {
    dotenv.config();
  app.post('/login', {
    schema: {
      description: 'Authentification de l\'utilisateur et génération d\'un token JWT',
      tags: ['auth'],
      body: loginModel,
      response: {
        200: loginResponseModel,
        401: {
          type: 'object',
          properties: {
            message: { type: 'string', description: "Message d'erreur en cas d'identifiants incorrects" }
          }
        }
      }
    }
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, password } = request.body as { email: string; password: string };
    
    // Simulation de vérification des informations d'identification (à remplacer par la BDD)
    if (email !== process.env.JWT_EMAIL_TOKEN?.toString() || password !== process.env.JWT_PASSWORD_TOKEN?.toString()) {
        console.error('Identifiants incorrects : Valeurs en input :' , { email, password });
        return reply.code(401).send({ message: 'Identifiants incorrects' });
    }

    // Génération du token JWT
    const token = app.jwt.sign({ email, role: 'admin' }, { expiresIn: process.env.JWT_EXPIRES_IN });
    // Debug toute la requête, token inclus sous forme de tableau
    console.info('Le token JWT généré est :', { token });
    console.info('Il expire dans :', process.env.JWT_EXPIRES_IN);


    return reply.send({ token });
  },

);
}
