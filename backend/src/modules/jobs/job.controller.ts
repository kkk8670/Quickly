// modules/jobs/jobs.controller.ts
import { FastifyRequest, FastifyReply } from 'fastify'
import { createJob, getJobs } from './job.service.js'
import { CreateJobSchema, CreateJobDTO } from './job.schema.js';


// http post
export const createQuickBookHandler = async (req: FastifyRequest, res: FastifyReply) => {
  const result = CreateJobSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).send(result.error);
  }
  const payload: CreateJobDTO = {
    ...result.data,
    type: 'QUICK_BOOK',
    customerId: 'customer_001'
  };

  const job = await createJob(payload)

  return res.status(201).send({ jobId: job.id, status: job.status })
}

export const getJobsHandler = async (req: FastifyRequest, res: FastifyReply) => {
  const jobs = await getJobs()
  return res.send(jobs)
}