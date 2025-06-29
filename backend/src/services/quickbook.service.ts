import { Job } from '@prisma/client'
import { createJobInDB } from '@/repositories/job.repository.js'
import { JobDTO } from '@/models/schema.js'
import { Server } from 'socket.io';
import registerQuickBookHandler from '@/socket/quickbook.socket.js'

export const createQuickBookJob = async (
    input: JobDTO,
    io?: Server
): Promise<Job> => {

    const job = await createJobInDB(input);
    // io?.emit('new-job', job);
    await registerQuickBookHandler.broadcastQuickBook(job);
    return job;
}

