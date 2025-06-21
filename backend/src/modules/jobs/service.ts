// modules/jobs/jobs.service.ts
import { Job } from '@prisma/client'
import { createJobInDB, getAllJobs } from './repository.js'
import type { CreateJobDTO } from '@/types/job.js'
import { Server } from 'socket.io';


export const createJob = async (input: CreateJobDTO, io?: Server): Promise<Job> => {
 
    const job = await createJobInDB(input);
    if (io) {
        io.emit('new-job', job);
      }
    return job;
}

export const getJobs = async (): Promise<Job[]> => {
    return await getAllJobs()
}
