// modules/jobs/jobs.service.ts
import { Job } from '@prisma/client'
import { createJobInDB, getAllJobs } from './job.repository.js'
import type { CreateJobDTO } from './job.schema.js'
import { Server } from 'socket.io';


export const createJob = async (
    input: CreateJobDTO, 
    io?: Server
): Promise<Job> => {

    const job = await createJobInDB(input);
    io?.emit('new-job', job);
    return job;
}

export const getJobs = async (): Promise<Job[]> => {
    return await getAllJobs()
}
