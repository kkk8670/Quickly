import { FastifyInstance } from 'fastify'
import { getJobsHandler, createJobHandler } from './job.controller.js'


const jobRoutes = async (app: FastifyInstance) => {
  // GET Job
  app.get('/api/jobs', getJobsHandler)

  //  POST Job
  app.post('/api/jobs', createJobHandler);
}

export default jobRoutes