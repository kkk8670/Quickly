import 'tsconfig-paths/register'
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { jobRoutes } from '@/modules/jobs/jobs.routes';

const app = Fastify({ logger: true });

app.register(cors);
app.register(jobRoutes, { prefix: '/api' });

// Basic test route
app.get('/', async () => {
    return { message: 'Hello from Fastify backend!' };
});

const start = async () => {
    try {
        await app.listen({ port: 3001, host: '0.0.0.0' });
        console.log('Server running on http://localhost:3001');
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();