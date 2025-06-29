import { Job } from '@prisma/client'
import { createJobInDB, updateJobInBD } from '@/repositories/job.repository.js'
import { JobSchema, JobDTO } from '@/models/schema.js'
import { Server } from 'socket.io';


// import socketService from '@/services/socket.postquote.js'

export const createPostQuoteJob = async (
    input: JobDTO,
    io?: Server
): Promise<Job> => {

    const job = await createJobInDB(input);

    return job;
}

export const updatePostQuoteJob = async (
    jobId: string,
    updateData: Partial<Job>,
    io?: Server
): Promise<Job> => {

    const job = await updateJobInBD(jobId, updateData);
    // if (io) {
    //     io.emit('job_updated', job);  
    // }
    return job;
}
