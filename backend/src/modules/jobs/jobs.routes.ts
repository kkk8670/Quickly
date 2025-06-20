import { FastifyInstance } from 'fastify';
import { getJobsHandler } from './jobs.controller';
import { z } from 'zod'

 

const jobRoutes = async (app: FastifyInstance) => {
    // GET 所有 Job
    app.get('/api/jobs', async () => {
      return await app.prisma.job.findMany()
    })
  
    // ✅ POST 新建 Job
    app.post('/api/jobs', async (request, reply) => {
      const schema = z.object({
        type: z.enum(['QUICK_BOOK', 'POST_QUOTE']),
        customerId: z.string(),
        details: z.string(),
      })
  
      const result = schema.safeParse(request.body)
      if (!result.success) {
        return reply.status(400).send(result.error)
      }
  
      const job = await app.prisma.job.create({
        data: result.data,
      })
  
      return reply.status(201).send(job)
    })
  }

export default jobRoutes