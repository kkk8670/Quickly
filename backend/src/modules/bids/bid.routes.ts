// backend/src/modules/bids/routes.ts
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { createBid, getBidsByJobId } from './bid.service.js'

const bidRoutes = async (app: FastifyInstance) => {
    // GET  
    app.get('/api/bids/:jobId', async (req, res) => {
        const jobId = (req.params as any).jobId
        const bids = await getBidsByJobId(jobId)
        res.send(bids)
    })

    // POST  
    app.post('/api/bids', async (req, res) => {
        const schema = z.object({
            jobId: z.string(),
            providerId: z.string(),
            amount: z.number(),
            message: z.string()
        })

        const result = schema.safeParse(req.body)
        if (!result.success) return res.status(400).send(result.error)

        const bid = await createBid(result.data)
        res.status(201).send(bid)

        // todo WebSocket 
    })
}

export default bidRoutes