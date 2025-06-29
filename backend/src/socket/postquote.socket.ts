// src/socket/handlers/postquote.socket.ts
import { Socket } from 'socket.io'

export function registerPostQuoteHandler(socket: Socket) {
    socket.on('join_room', ({ jobId }) => {
        if (typeof jobId === 'string') {
            socket.join(jobId)
            console.log(`🔗 Socket ${socket.id} joined room ${jobId}`)
        }
    })

    socket.on('disconnect', () => {
        console.log(`❌ socket postquote disconnected: ${socket.id}`)
    })
}