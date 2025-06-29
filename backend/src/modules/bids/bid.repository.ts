import { prisma } from '@/lib/prisma.js';
import { CreateBidDTO } from './bid.schema.js';

export const createBidInDB = async (input: CreateBidDTO) => {
    return prisma.bid.create({ data: input });
};

export const getBidsByJob = async (jobId: string) => {
    return prisma.bid.findMany({
        where: { jobId },
        orderBy: { createdAt: 'desc' },
    });
};