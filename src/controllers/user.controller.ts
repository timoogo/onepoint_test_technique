import { FastifyRequest, FastifyReply } from 'fastify';
import { createUser } from '../services/user.service';

export const registerUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email, name, password, role } = request.body as {
    email: string;
    name: string;
    password: string;
    role?: string;
  };

  try {
    if (!email || !password || !name) {
      return reply.status(400).send({ message: 'Tous les champs sont obligatoires.' });
    }

    const user = await createUser(email, name, password, role || 'user');
    reply.status(201).send({
      message: 'Utilisateur créé avec succès',
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (error) {
    reply.status(500).send({ message: 'Erreur serveur', error });
  }
};
