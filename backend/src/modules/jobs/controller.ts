// modules/jobs/jobs.controller.ts
import { FastifyRequest, FastifyReply } from 'fastify'
import { createJob, getJobs } from './service.js'
import type { CreateJobDTO } from '@/types/job.js'
import { z } from 'zod';

const CreateJobSchema = z.object({
  type: z.enum(['QUICK_BOOK', 'POST_QUOTE']),
  customerId: z.string(),
  details: z.string(),
});

// http post
export const createJobHandler = async (req: FastifyRequest, res: FastifyReply) => {
  const result = CreateJobSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).send(result.error);
  }
  const job = await createJob(result.data)

  return res.status(201).send(job)
}

export const getJobsHandler = async (req: FastifyRequest, res: FastifyReply) => {
  const jobs = await getJobs()
  return res.send(jobs)
}