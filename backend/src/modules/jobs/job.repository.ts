// modules/jobs/jobs.repository.ts
import { prisma } from '@/lib/prisma.js'
import { Job  } from '@prisma/client'
import type { CreateJobDTO } from './job.schema.js'

// insert db
export const createJobInDB = async (input: CreateJobDTO): Promise<Job> => {
    return prisma.job.create({ data: input }) 
}

// read db
export const getAllJobs = async (): Promise<Job[]> => {
    return prisma.job.findMany({ orderBy: { createdAt: 'desc' } })
}