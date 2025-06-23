// modules/jobs/jobs.controller.ts
import { FastifyRequest, FastifyReply } from 'fastify'
import { createJob, getJobs } from './job.service.js'
import { CreateJobSchema } from './job.schema.js';
 

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