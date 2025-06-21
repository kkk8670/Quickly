// main.ts
import Fastify from 'fastify'
import cors from '@fastify/cors'
import fastifyIO from 'fastify-socket.io'
import jobRoutes from './modules/jobs/routes.js'
import { registerSocketHandlers } from './modules/jobs/socket.js';


const app = Fastify()

await app.register(cors)
await app.register(fastifyIO.default);
await app.register(jobRoutes)

registerSocketHandlers(app.io);

await app.listen({ port: 3001, host: '0.0.0.0' })
console.log('Backend running on http://localhost:3001')