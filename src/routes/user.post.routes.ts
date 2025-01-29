import { FastifyInstance, FastifyRequest } from 'fastify';
import { validateDto } from '../middlewares/validate-dto.middleware';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserController } from '../controllers/user.controller';
import { ResponseHandler } from '../utils/response.handler';

export async function userPostRoutes(fastify: FastifyInstance) {
  const userController = new UserController();

  // Typage explicite pour `request.body`
  fastify.post('/',   {
    schema: {
      tags: ['Users'], // Cette ligne associe la route à la section "User"
      description: 'Créer un utilisateur',
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          password: { type: 'string' },
          role: { type: 'string', enum: ['admin', 'user'] },
        },
        required: ['name', 'email', 'password'],
      },
      response: {
        201: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            user: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                email: { type: 'string' },
                role: { type: 'string' },
              },
            },
          },
        },
      },
    },
  },
  async (request: FastifyRequest<{ Body: CreateUserDto }>, reply) => {
    try {
      // Valide le body de la requête avec le DTO
      const validatedBody = await validateDto(CreateUserDto, request.body);

      // Appelle la méthode createUser du contrôleur
      const newUser = await userController.createUser(validatedBody);
      ResponseHandler.success(reply, { user: newUser }, 'Utilisateur créé', 201);
    } catch (error) {
      ResponseHandler.error(reply, error);
    }
  });
}
