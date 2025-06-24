// modules/jobs/jobs.controller.ts
import { FastifyRequest, FastifyReply } from 'fastify'
import { createBid, getBidsByJobId } from './bid.service.js'
import { CreateBidSchema } from './bid.schema.js';
 

// http post
export const createBidHandler = async (req: FastifyRequest, res: FastifyReply) => {
  const result = CreateBidSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).send(result.error);
  }
  const bid = await createBid(result.data)

  return res.status(201).send(bid)
}

export const getBidsByJobIdHandler = async (req: FastifyRequest, res: FastifyReply) => {
    const { jobId } = req.params as any;
    // const jobId = (req.params as any).jobId
    const bids = await getBidsByJobId(jobId)
    return res.send(bids)
}

 