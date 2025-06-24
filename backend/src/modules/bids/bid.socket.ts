import { Server, Socket } from 'socket.io';
import { createBid } from './bid.service.js';
import { CreateBidSchema } from './bid.schema.js';

export const registerBidSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log(`[Bid] WebSocket connected at ${new Date().toISOString()}`, socket.id,);

    socket.on('create-bid', async (data) => {
      console.log('Received create-bid:', data);
      const result = CreateBidSchema.safeParse(data);

      if (!result.success) {
        socket.emit('bid-error', result.error.format());
        return;
      }

      await createBid(result.data, io, socket);
    });
  });
};