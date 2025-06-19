import { prisma } from '@/lib/prisma';

export function findAllJobs() {
    return prisma.job.findMany();
}