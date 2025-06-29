import { Job } from '@prisma/client'
import { createJobInDB } from '@/repositories/job.repository.js'
import { JobDTO } from '@/models/schema.js'
import { Server } from 'socket.io';
import registerQuickBookHandler from '@/socket/quickbook.socket.js'

export const createQuickBookJob = async (
    input: JobDTO,
    io?: Server
): Promise<Job> => {
    console.log('here is createQuickBook', io)
    const job = await createJobInDB(input);
    if (io) {
        console.log('here is ioioio')
        simulateProviderMatch(job, io);
    }
    await registerQuickBookHandler.broadcastQuickBook(job);

    return job;
}

type Provider = {
    id: string;
    name?: string;
    rating?: number;
};

const mockProvider: Provider = {
    id: 'provider-007',
    name: 'Jack',
    rating: 4.9,

};
import { getConnectedUsers } from "@/socket/socketState.js";
const connectedUsers = getConnectedUsers();
export const simulateProviderMatch = (job: Job, io: Server) => {
    const { id: jobId, customerId } = job;

    console.log(`[backend] match job: ${jobId}, user: ${customerId}`);

    setTimeout(() => {
        const customerSocket = connectedUsers.get(customerId);

        if (customerSocket) {

            console.log(`[backend]send 'job_matched'  to ${customerId}  : ${jobId}`);
            customerSocket.emit('job_matched', {
                jobId: jobId,
                providerInfo: mockProvider,
                message: 'matched!',
            });
        } else {

            console.warn(`[backend] not matched userId: ${customerId} with Job: ${jobId}`);

        }
    }, 5000);
};