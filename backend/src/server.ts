import Fastify from 'fastify';
import cors from '@fastify/cors';

const app = Fastify();

app.register(cors);

// Basic test route
app.get('/', async () => {
    return { message: 'Hello from Fastify backend!' };
});

const start = async () => {
    try {
        await app.listen({ port: 3001 });
        console.log('Server running on http://localhost:3001');
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();