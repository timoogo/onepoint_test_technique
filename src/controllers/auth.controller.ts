import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { FastifyReply, FastifyRequest } from "fastify";
import { HttpMessages, HttpStatus } from "../config/http.config";
import { LoginDto } from "../dtos/login.dto";
import { RegisterDto } from "../dtos/register.dto";
import { BaseException } from "../exeptions/base.exception";
import { validateDto } from "../middlewares/validate-dto.middleware";
import { AuthService } from "../services/auth.service";
import { ResponseHandler } from "../utils/response.handler";

/**
 * Contrôleur pour l'authentification.
 */
export class AuthController {
	private authService: AuthService;

	/**
	 * Crée une instance de AuthController.
	 */
	constructor() {
		this.authService = new AuthService();
	}

	/**
	 * Effectue une connexion.
	 *
	 * @param {FastifyRequest<{ Body: LoginDto }>} request - La requête Fastify.
	 * @param {FastifyReply} reply - La réponse Fastify.
	 * @returns {Promise<FastifyReply>} - La réponse Fastify.
	 */
	async login(
		request: FastifyRequest<{ Body: LoginDto }>,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		try {
			ResponseHandler.info(
				"Login request received",
				{ email: request.body.email },
				request,
			);

			// Validation avec `validateDto`
			const loginDto = await validateDto(LoginDto, request.body);

			// Authentification via le service
			const { token, user } = await this.authService.login(
				loginDto,
				request.server,
			);

			ResponseHandler.success("Successfully logged in", user, request);
			request.log.info("Token sent to client (@controller)");

			return reply.status(HttpStatus.OK).send({
				status: "success",
				token,
				user,
			});
		} catch (error: any) {
			if (error instanceof BaseException) {
				ResponseHandler.error("Login error", error.message, request);
				return reply.status(error.statusCode).send({
					status: "error",
					errorCode: error.statusCode,
					message: error.message,
				});
			}

			ResponseHandler.error("Unknown error", error.message, request);
			return reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
				status: "error",
				errorCode: HttpStatus.INTERNAL_SERVER_ERROR,
				message: HttpMessages.INTERNAL_SERVER_ERROR,
			});
		}
	}

	/**
	 * Enregistre un nouvel utilisateur.
	 *
	 * @param {FastifyRequest} request - La requête Fastify.
	 * @param {FastifyReply} reply - La réponse Fastify.
	 * @returns {Promise<FastifyReply>} - La réponse Fastify.
	 */
	async register(
		request: FastifyRequest,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		try {
			request.log.info("Registration request received", {
				body: request.body,
				requestId: request.id,
			});

			// Validation DTO
			const registerDto = plainToInstance(RegisterDto, request.body);
			const errors = await validate(registerDto);
			if (errors.length > 0) {
				ResponseHandler.error(HttpMessages.BAD_REQUEST, errors, request);
				return reply.status(HttpStatus.BAD_REQUEST).send({
					status: "error",
					errorCode: HttpStatus.BAD_REQUEST,
					message: HttpMessages.BAD_REQUEST,
					errors,
				});
			}

			// Enregistrement de l'utilisateur
			request.log.info("Validation OK, registration in progress...");
			const user = await this.authService.register(registerDto);
			request.log.info("Successfully registered", { email: user.email });

			return reply.status(HttpStatus.CREATED).send({
				status: "success",
				message: HttpMessages.CREATED,
				user,
			});
		} catch (error: any) {
			request.log.error("Registration error", error);
			return reply.status(HttpStatus.BAD_REQUEST).send({
				status: "error",
				errorCode: HttpStatus.BAD_REQUEST,
				message: error.message || HttpMessages.BAD_REQUEST,
			});
		}
	}

	/**
	 * Déconnecte un utilisateur.
	 *
	 * @param {FastifyRequest} request - La requête Fastify.
	 * @param {FastifyReply} reply - La réponse Fastify.
	 * @returns {Promise<FastifyReply>} - La réponse Fastify.
	 */
	async logout(
		request: FastifyRequest,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		try {
			request.log.info("Logout attempt");

			const response = await this.authService.logout(request);
			request.log.info("Successfully logged out");

			return reply.status(HttpStatus.OK).send({
				status: "success",
				message: HttpMessages.SUCCESS,
				data: response,
			});
		} catch (error: any) {
			request.log.error("Logout error", error);
			return reply.status(HttpStatus.BAD_REQUEST).send({
				status: "error",
				errorCode: HttpStatus.BAD_REQUEST,
				message: error.message || HttpMessages.BAD_REQUEST,
			});
		}
	}
}
