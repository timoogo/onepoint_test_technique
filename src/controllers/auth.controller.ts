import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ResponseHandler } from '../utils/response.handler';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(request: FastifyRequest<{ Body: LoginDto }>, reply: FastifyReply) {
    try {
      ResponseHandler.info("🔹 Requête reçue pour login", { email: request.body.email }, request);
  
      const loginDto = plainToInstance(LoginDto, request.body);
      const errors = await validate(loginDto);
      if (errors.length > 0) {
        ResponseHandler.error("❌ Erreur de validation", errors, request);
        return reply.status(400).send({ message: "Invalid credentials", errors });
      }
  
      const { token, user } = await this.authService.login(loginDto, request.server);
  
      ResponseHandler.success("✅ Connexion réussie", user, request);
      console.log("🔑 Token envoyé au client (@controller):", token);
      return reply.send({ token, user });
  
    } catch (error) {
      ResponseHandler.error("❌ Échec de connexion", (error as Error).message, request);
      return reply.status(401).send({ message: "Unauthorized", error: (error as Error).message });
    }
  }
  
  

  async register(request: FastifyRequest, reply: FastifyReply) {
    try {
        console.log("📥 Requête reçue pour inscription :", request.body);
        console.log("🔄 Requête unique ? Vérification de l'ID de requête :", request.id);

        const registerDto = plainToInstance(RegisterDto, request.body);
        const errors = await validate(registerDto);

        if (errors.length > 0) {
            return reply.status(400).send({ errors });
        }

        console.log("✅ Validation OK, enregistrement en cours...");
        const user = await this.authService.register(registerDto);
        console.log("✔️ Inscription réussie pour :", user.email);
        
        reply.status(201).send(user);
    } catch (error: any) {
        console.error("❌ Erreur dans register :", error);
        reply.status(400).send({ error: error.message || "Erreur inconnue" });
    }
}


async logout(request: FastifyRequest, reply: FastifyReply) {
  try {
    const response = await this.authService.logout(request);
    reply.send(response);
  } catch (error: any) {
    console.error("❌ Erreur dans logout :", error);
    reply.status(400).send({ error: error.message || "Erreur inconnue" });
  }
}


}