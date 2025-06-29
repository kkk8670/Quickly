import { JobDTO, CreateQuickBookSchema } from '@/models/schema.js'
import { FastifyRequest, FastifyReply } from 'fastify';
import { createQuickBookJob } from '@/services/quickbook.service.js'
import { getJobById } from '@/repositories/job.repository.js';

export const createAndMatch = async (
    req: FastifyRequest,
    res: FastifyReply
) => {
    console.log('qb-controller: Received POST /quick-book/create');
    console.log('Body:', req.body);
    try {
        // const user = req.user;
        const result = CreateQuickBookSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).send(result.error);
        }
        const { serviceType, address, estimatedPrice, timeRange, coordinates } = result.data
        const payload: JobDTO = {
            serviceType,
            status: 'PENDING',
            address,
            price: estimatedPrice,
            jobStartTime: new Date(timeRange[0]),
            jobEndTime: new Date(timeRange[1]),
            lat: coordinates?.[1] ?? null,
            lng: coordinates?.[0] ?? null,
            type: 'QUICK_BOOK',
            customerId: 'customer_001'
        };

        const createdJob = await createQuickBookJob(payload);
        // await socketService.broadcastQuickBook(createdJob);
        console.log('create Job', createdJob)

        return res.send({
            success: true,
            jobId: createdJob.id
        });

    } catch (error) {
        console.error('createAndMatch error:', error);
        return res.status(500).send({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}

export const getQuickBookOrder = async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params as { id: string };
    try {
        const job = await getJobById(id);
        if (!job) {
            return res.status(404).send({ success: false, message: 'Job not found' });
        }
        const quickBookOrder = {
            serviceType: job.serviceType,
            timeRange: [job.jobStartTime, job.jobEndTime],
            address: job.address,
            coord: [job.lat, job.lng],
            price: job.price,
            status: job.status
        }

        return res.send({ success: true, data: quickBookOrder });
    } catch (error) {
        console.error('getJobById error:', error);
        return res.status(500).send({ success: false, message: 'Internal error' });
    }
};