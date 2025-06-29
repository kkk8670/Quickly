import { FastifyRequest, FastifyReply } from 'fastify';
import { JobDTO, CreatePostQuoteSchema } from '@/models/schema.js'
import { createPostQuoteJob, updatePostQuoteJob } from '@/services/postquote.service.js'
import registerPostQuoteHandler from '@/socket/postquote.socket.js'
import { Server } from 'socket.io';

export const createAndPidding = async (
    req: FastifyRequest,
    res: FastifyReply,
    io: Server
) => {
    console.log('qb-controller: Received POST /post-quote/create');
    console.log('Body:', req.body);
    try {
        // const user = req.user;
        const result = CreatePostQuoteSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).send(result.error);
        }
        const { serviceType, address, description, timeRange, coordinates, budgetRange } = result.data
        const payload: JobDTO = {
            serviceType,
            status: 'PENDING',
            address,
            description,
            budgetMin: budgetRange?.[0] ?? null,
            budgetMax: budgetRange?.[1] ?? null,
            jobStartTime: new Date(timeRange[0]),
            jobEndTime: new Date(timeRange[1]),
            lat: coordinates?.[1] ?? null,
            lng: coordinates?.[0] ?? null,
            type: 'POST_QUOTE',
            customerId: 'customer_001',
            price: 0
        };

        const createdJob = await createPostQuoteJob(payload, io);

        // console.log('create Job', createdJob)

        return res.send({
            success: true,
            jobId: createdJob.id
        });

    } catch (error) {
        console.error('createAndPidding error:', error);
        return res.status(500).send({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}

export const getPostQuoteOrder = async (
    req: FastifyRequest,
    res: FastifyReply
) => {
    console.log('qb-controller: Received POST /post-quote/order');
    console.log('Body:', req.body);
    try {
        // const user = req.user;
        const { jobId } = req.params as { jobId: string };
        const { bidId } = req.body as { bidId: string };

        const updatedJob = await updatePostQuoteJob(jobId,
            {
                selectedBidId: bidId,
                status: 'COMPLETED',
            })

        res.send({ success: true, job: updatedJob });
    } catch (err) {
        console.error(err);
        res.status(500).send({ success: false, error: 'Internal Server Error' });
    }
}


export const mockBidQuote = async (
    req: FastifyRequest,
    res: FastifyReply
) => {
    const { jobId, budgetRange } = req.body as {
        jobId: string;
        budgetRange: number[]
    };
    const [min, max] = budgetRange;
    console.log('[MOCK BID] jobId:', jobId);
    const fakeBid = {
        id: crypto.randomUUID(),
        providerName: `Provider ${Math.floor(Math.random() * 10 + 1)}`,
        rating: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)),
        message: 'We can finish this fast!',
        estimatedTime: `${Math.floor(Math.random() * 5 + 1)} days`,
        price: Math.floor(Math.random() * (max - min + 1)) + min,
    };
    console.log('here is fakebid', jobId)
    registerPostQuoteHandler.broadcastPostQuote({
        jobId,
        payload: fakeBid
    });
    console.log('[MOCK BID] return:', fakeBid);
    return res.send({ status: 'ok', sent: fakeBid });
}