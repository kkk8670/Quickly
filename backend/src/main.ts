// main.ts
import Fastify from 'fastify'
import cors from '@fastify/cors'
import fastifyIO from 'fastify-socket.io'
import jobRoutes from './modules/jobs/job.routes.js'
import { registerJobSocket } from './modules/jobs/job.socket.js';
import bidRoutes from './modules/bids/bid.routes.js';
import { registerBidSocket } from './modules/bids/bid.socket.js';

const app = Fastify()

await app.register(cors)
await app.register(fastifyIO.default);
await app.register(jobRoutes)
await app.register(bidRoutes);

registerJobSocket(app.io);
registerBidSocket(app.io);

await app.listen({ port: 3001, host: '0.0.0.0' })
console.log('Backend running on http://localhost:3001')