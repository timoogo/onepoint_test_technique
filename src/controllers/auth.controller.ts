import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ResponseHandler } from '../utils/response.handler';
import { HttpStatus, HttpMessages } from '../config/http.config';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(request: FastifyRequest<{ Body: LoginDto }>, reply: FastifyReply) {
    try {
      ResponseHandler.info("🔹 Requête reçue pour login", { email: request.body.email }, request);
  
      // Transformation et validation du DTO
      const loginDto = plainToInstance(LoginDto, request.body);
      const errors = await validate(loginDto);
      if (errors.length > 0) {
        ResponseHandler.error("❌ Erreur de validation", errors, request);
        return reply.status(HttpStatus.BAD_REQUEST).send({
          status: "error",
          errorCode: HttpStatus.BAD_REQUEST,
          message: HttpMessages.BAD_REQUEST,
          errors,
        });
      }
  
      // Authentification via le service
      const { token, user } = await this.authService.login(loginDto, request.server);
  
      ResponseHandler.success("✅ Connexion réussie", user, request);
      request.log.info("🔑 Token envoyé au client (@controller)");
  
      return reply.status(HttpStatus.OK).send({
        status: "success",
        token,
        user,
      });
  
    } catch (error) {
      ResponseHandler.error("❌ Échec de connexion", (error as Error).message, request);
      return reply.status(HttpStatus.UNAUTHORIZED).send({
        status: "error",
        errorCode: HttpStatus.UNAUTHORIZED,
        message: HttpMessages.UNAUTHORIZED,
        error: (error as Error).message,
      });
    }
  }
  
  

  async register(request: FastifyRequest, reply: FastifyReply) {
    try {
      request.log.info("📥 Requête reçue pour inscription", { body: request.body, requestId: request.id });
  
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
      request.log.info("✅ Validation OK, enregistrement en cours...");
      const user = await this.authService.register(registerDto);
      request.log.info("✔️ Inscription réussie", { email: user.email });
  
      return reply.status(HttpStatus.CREATED).send({
        status: "success",
        message: HttpMessages.CREATED,
        user,
      });
  
    } catch (error: any) {
      request.log.error("❌ Erreur lors de l'inscription", error);
      return reply.status(HttpStatus.BAD_REQUEST).send({
        status: "error",
        errorCode: HttpStatus.BAD_REQUEST,
        message: error.message || HttpMessages.BAD_REQUEST,
      });
    }
  }
  


  async logout(request: FastifyRequest, reply: FastifyReply) {
    try {
      request.log.info("🔓 Tentative de déconnexion");
  
      const response = await this.authService.logout(request);
      request.log.info("✔️ Déconnexion réussie");
  
      return reply.status(HttpStatus.OK).send({
        status: "success",
        message: HttpMessages.SUCCESS,
        data: response,
      });
  
    } catch (error: any) {
      request.log.error("❌ Erreur lors de la déconnexion", error);
      return reply.status(HttpStatus.BAD_REQUEST).send({
        status: "error",
        errorCode: HttpStatus.BAD_REQUEST,
        message: error.message || HttpMessages.BAD_REQUEST,
      });
    }
  }


}