import { FastifyReply } from 'fastify';

export class ResponseHandler {
  /**
   * Envoie une réponse de succès standardisée
   * @param reply - Instance de FastifyReply
   * @param data - Données à inclure dans la réponse
   * @param message - Message associé à la réponse
   * @param statusCode - Code HTTP à retourner (par défaut : 200)
   */
  static success(reply: FastifyReply, data: any, message = 'Succès', statusCode = 200) {
    if (reply.sent) {
      console.warn("⚠️ La réponse a déjà été envoyée !");
      return;
    }
  
    const responseBody = {
      status: 'success',
      message,
      data,
    };  
    reply.header("Content-Type", "application/json");
    reply.status(statusCode).send(JSON.stringify(responseBody));
  }
  
  

  /**
   * Log d'informations pour le debug (visible uniquement si DEBUG=true dans .env)
   * @param message - Message à afficher
   * @param context - Contexte ou données supplémentaires (facultatif)
   */
  static info(message: string, context: any = null) {
    if (process.env.DEBUG === 'true') {
      console.log(`[INFO]: ${message}`, context || '');
    }
  }

  /**
   * Gère les erreurs et retourne une réponse standardisée
   * @param reply - Instance de FastifyReply
   * @param error - Erreur capturée (peut être un objet Error ou une chaîne)
   * @param statusCode - Code HTTP à retourner (par défaut : 500)
   */
  static error(reply: FastifyReply, error: any, statusCode = 500) {
    // Log de l'erreur
    if (error instanceof Error) {
      console.error(`[ERROR]: ${error.message}`, error.stack);
    } else {
      console.error(`[ERROR]: ${JSON.stringify(error)}`);
    }

    // Réponse d'erreur standardisée
    reply.status(statusCode).send({
      status: 'error',
      message: error.message || 'Une erreur interne est survenue',
      error: process.env.DEBUG === 'true' ? error : undefined, // Inclure l'erreur complète uniquement en mode debug
    });
  }
}
