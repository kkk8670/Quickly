// backend/src/modules/bids/service.ts
import { Server, Socket } from 'socket.io';
import { CreateBidDTO } from './bid.schema.js';
import { createBidInDB, getBidsByJob } from './bid.repository.js';

export const createBid = async (
    input: CreateBidDTO,
    io?: Server,
    socket?: Socket
) => {
    const bid = await createBidInDB(input);
    socket?.emit('bid-created', bid); 
    io?.emit('new-bid', bid); 
}

export const getBidsByJobId = async (jobId: string) => {
    return getBidsByJob(jobId);
}