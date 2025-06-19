import { FastifyInstance } from 'fastify';
import { getJobsHandler } from './jobs.controller';

export async function jobRoutes(server: FastifyInstance) {
    server.get('/jobs', getJobsHandler);
}