import { FastifyReply, FastifyRequest } from 'fastify';
import { getJobs } from './jobs.service';

export async function getJobsHandler(req: FastifyRequest, res: FastifyReply) {
    const jobs = await getJobs();
    res.send(jobs);
}