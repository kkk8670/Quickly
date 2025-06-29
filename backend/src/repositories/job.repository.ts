import { prisma } from '@/lib/prisma.js'
import { Job } from '@prisma/client'
import { JobSchema, JobDTO } from '@/models/schema.js'
import { cleanObject } from '@/utils/cleanObject.js';

// insert db
export const createJobInDB = async (input: JobDTO): Promise<Job> => {
    return prisma.job.create({ data: cleanObject(input) })
}

// read db
export const getAllJobs = async (): Promise<Job[]> => {
    return prisma.job.findMany({ orderBy: { createdAt: 'desc' } })
}

export const getJobById = async (id: string): Promise<Job | null> => {
    return prisma.job.findUnique({ where: { id } });
};

export const updateJobInBD = async (jobId: string, data: Partial<Job>): Promise<Job> => {
    return prisma.job.update({
        where: { id: jobId },
        data
    });
};