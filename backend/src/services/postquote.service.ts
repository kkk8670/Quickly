import { Job } from '@prisma/client'
import { createJobInDB, updateJobInBD } from '@/repositories/job.repository.js'
import { JobSchema, JobDTO } from '@/models/schema.js'
import { Server } from 'socket.io';
import registerPostQuoteHandler from '@/socket/postquote.socket.js'

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
    // await registerPostQuoteHandler.broadcastPostQuote(job);

    return job;
}


