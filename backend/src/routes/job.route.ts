import { FastifyInstance } from 'fastify';
import { getJobByIdHandler } from '@/controllers/job.controller.js';

export const jobRoutes = async (app: FastifyInstance) => {
    app.get('/:id', getJobByIdHandler);
};
