import { FastifyReply } from 'fastify';

export class ResponseHandler {
  /**
   * Gère les réponses de succès
   */
  static success(reply: FastifyReply, data: any, message = 'Succès', statusCode = 200) {
    reply.status(statusCode).send({
      status: 'success',
      message,
      data,
    });
  }

  /**
   * Gère les messages d'information pour le debug
   */
  static info(message: string, context: any = null) {
    if (process.env.DEBUG === 'true') {
      console.log(`[INFO]: ${message}`, context || '');
    }
  }

  /**
   * Gère les erreurs
   */
  static error(reply: FastifyReply, error: any) {
    if (error instanceof Error) {
      console.error(`[ERROR]: ${error.message}`, error.stack);
    } else {
      console.error(`[ERROR]: ${JSON.stringify(error)}`);
    }

    reply.status(500).send({
      status: 'error',
      message: 'Une erreur interne est survenue',
      error: error.message || error,
    });
  }
}
