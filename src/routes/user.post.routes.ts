import { FastifyInstance, FastifyRequest } from "fastify";
import { UserController } from "../controllers/user.controller";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { validateDto } from "../middlewares/validate-dto.middleware";
import { HttpMessages, HttpStatus } from "../config/http.config";

import { UserSchemas } from "../schemas/user.schemas"; // ✅ Import du schéma global
import { UserConfig } from "../config/user.config";
import { PasswordValidationException } from "../exeptions/password-validation.exception";
import { ValidationException } from "../exeptions/validation-exception.exception";

export async function userPostRoutes(fastify: FastifyInstance) {
    const userController = new UserController();

    fastify.post(
        "/register",
        { schema: UserSchemas.Register }, // ✅ Utilisation propre du schéma
        async (request: FastifyRequest<{ Body: CreateUserDTO }>, reply) => {
            try {
                const validatedBody = await validateDto(CreateUserDTO, request.body);
                const newUser = await userController.createUser(validatedBody);

                return reply.status(HttpStatus.CREATED).send({
                    status: {
                        code: HttpStatus.CREATED,
                        message: HttpMessages.CREATED,
                    },
                    data: newUser,
                });
            } catch (error: any) {
                console.error("🔴 Erreur capturée :", error);

                if (error instanceof PasswordValidationException) {
                    return reply.status(HttpStatus.BAD_REQUEST).send({
                        status: "error",
                        errorCode: HttpStatus.BAD_REQUEST,
                        message: UserConfig.PASSWORD.PATTERN_MESSAGE,
                        violatedConstraints: error.violatedConstraints,
                    });
                }

                if (error instanceof ValidationException) {
                    return reply.status(HttpStatus.BAD_REQUEST).send({
                        status: "error",
                        errorCode: HttpStatus.BAD_REQUEST,
                        message: HttpMessages.BAD_REQUEST,
                        errors: error.errors,
                    });
                }

                return reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                    status: "error",
                    errorCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: HttpMessages.INTERNAL_SERVER_ERROR,
                    error: {
                        message: error.message || HttpMessages.INTERNAL_SERVER_ERROR,
                    },
                });
            }
        }
    );
}
