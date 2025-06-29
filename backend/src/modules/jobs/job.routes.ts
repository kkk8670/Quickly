import { FastifyInstance } from 'fastify'
import { getJobsHandler, createQuickBookHandler } from './job.controller.js'


const jobRoutes = async (app: FastifyInstance) => {
  // GET Job
  app.get('/api/jobs', getJobsHandler)

  // //  POST Job
  // app.post('/api/jobs/quick-book', createQuickBookHandler);
}

export default jobRoutes