// src/socket/registerHandlers.ts
import { Server } from 'socket.io'
import { registerPostQuoteHandler } from './postquote.socket.js'

const registerSocketHandlers = (io: Server) => {
    io.on('connection', (socket) => {
        console.log('✅ socket connected:', socket.id)

        registerPostQuoteHandler(socket)
        // registerAnotherHandler(socket)
    })
}

export default registerSocketHandlers