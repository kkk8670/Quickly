// backend/src/modules/bids/routes.ts
import { FastifyInstance } from 'fastify'
import { getBidsByJobIdHandler, createBidHandler } from './bid.controller.js'

const bidRoutes = async (app: FastifyInstance) => {
    // GET  
    app.get('/api/bids/:jobId', getBidsByJobIdHandler)

    // POST 
    app.get('/api/bids', createBidHandler)
}

export default bidRoutes