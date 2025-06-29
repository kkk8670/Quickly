// src/socket/handlers/postquote.socket.ts
import { Socket } from 'socket.io'
import { getIO } from './socketState.js'

const registerPostQuoteHandler = (socket: Socket) => {
    socket.on('join_room', ({ jobId }) => {
        console.log('join room leeee')
        if (typeof jobId === 'string') {
            socket.join(jobId)
            console.log(`🔗 Socket ${socket.id} joined room ${jobId}`)
        }
    })

    socket.on('disconnect', () => {
        console.log(`❌ socket postquote disconnected: ${socket.id}`)
    })
}

registerPostQuoteHandler.broadcastPostQuote = (data: { jobId: string, payload: any }) => {
    const io = getIO();
    // console.log('here is quote ioioio', io)
    if (!io) return;
    console.log('here is quote ioioio')
    io.to(data.jobId).emit('new_bid', data.payload);
};

export default registerPostQuoteHandler


