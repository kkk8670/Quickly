import { FastifyRequest, FastifyReply } from 'fastify'
import { getJobById } from '@/repositories/job.repository.js';


export const getJobByIdHandler = async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params as { id: string };
    try {
        const job = await getJobById(id);
        if (!job) {
            return res.status(404).send({ success: false, message: 'Job not found' });
        }
        return res.send({ success: true, data: job });
    } catch (error) {
        console.error('getJobById error:', error);
        return res.status(500).send({ success: false, message: 'Internal error' });
    }
};