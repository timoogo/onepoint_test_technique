import { FastifyInstance, FastifyRequest } from "fastify";
import { UserController } from "../controllers/user.controller";
import { CreateUserDto } from "../dtos/create-user.dto";
import { validateDto } from "../middlewares/validate-dto.middleware";
import { ResponseHandler } from "../utils/response.handler";
import { EnvironnementLevel } from "../config/environnement.config";

export async function userPostRoutes(fastify: FastifyInstance) {
	const userController = new UserController();
	fastify.post(
		"/register",
		{
      preHandler: [], // ✅ Aucun middleware nécessaire pour cette route
			schema: {
				tags: ["Users"], // Cette ligne associe la route à la section "User"
				description: "Créer un utilisateur",
				body: {
					type: "object",
					properties: {
						name: { type: "string" },
						email: { type: "string", format: "email" },
						password: { type: "string" },
						role: { type: "string", enum: ["admin", "user"] },
					},
					required: ["name", "email", "password"],
				},
				response: {
					201: {
						type: "object",
						properties: {
							message: { type: "string" },
							user: {
								type: "object",
								properties: {
									id: { type: "number" },
									name: { type: "string" },
									email: { type: "string" },
									role: { type: "string" },
								},
							},
						},
					},
				},
			},
		},
    async (request: FastifyRequest<{ Body: CreateUserDto }>, reply) => {
      try {
        console.log("Création d'un utilisateur");
    
        console.log("Validation du DTO");
        const validatedBody = await validateDto(CreateUserDto, request.body);
    
        if (process.env.ENVIRONNEMENT_LEVEL === EnvironnementLevel.DEVELOPMENT) {
          console.log("Body validé", validatedBody);
        }
    
        // Appelle la méthode createUser du contrôleur
        const newUser = await userController.createUser(validatedBody);
    
        if (process.env.ENVIRONNEMENT_LEVEL === EnvironnementLevel.DEVELOPMENT) {
          console.log("Nouvel utilisateur créé", newUser);
        }
    
        ResponseHandler.success("Utilisateur créé avec succès", newUser, request);
      } catch (error: any) {
        if (error.message === "Cet email est déjà utilisé.") {
          reply.status(400).send({
            status: "error",
            message: error.message,
          });
        } else {
          ResponseHandler.error(
            "Erreur lors de la création de l'utilisateur",
            error,
            request
          );
          reply.status(500).send({
            status: "error",
            message: "Erreur lors de la création de l'utilisateur",
          });
        }
      }
    }
  );
}    