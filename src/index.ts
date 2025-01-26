import fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { authRoutes } from './routes/auth.routes';
import dotenv from 'dotenv';
import jwt from '@fastify/jwt';

dotenv.config();

const app = fastify();


app.register(jwt, {
    secret: process.env.JWT_SECRET || 'supersecret',
  });


// Configuration de Swagger selon la version actuelle
app.register(swagger, {
  openapi: {
    info: {
      title: 'API de gestion des articles',
      description: 'Documentation de l\'API',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
        },
      },
    },
    security: [{ BearerAuth: [] }],
  },
});

app.register(swaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'none',
    deepLinking: false,
  },
  staticCSP: true,
  transformSpecification: (swaggerObject, req, reply) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
});

// Routes d'authentification
app.register(authRoutes);

// Route pour vérifier si l'API fonctionne
app.get('/', async () => {
  return { message: 'API fonctionne !' };
});

const start = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log('Serveur en écoute sur http://localhost:3000/docs');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
