import fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { userPostRoutes } from './routes/user.post.routes';

const app = fastify();

// Configuration Swagger
app.register(swagger, {
  swagger: {
    info: {
      title: 'Onepoint Test Technique API',
      description: 'Documentation de l\'API pour la gestion des articles',
      version: '1.0.0',
    },
  },
});

app.register(swaggerUi, {
  routePrefix: '/docs',
});

// Enregistrement des routes
app.register(userPostRoutes);

app.get('/', async () => {
  return { message: 'API en ligne !' };
});

const start = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log('Serveur en écoute sur http://localhost:3000');
    console.log('Swagger disponible sur http://localhost:3000/docs');
    console.log(app.printRoutes({
        commonPrefix: true,
        
    }));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
