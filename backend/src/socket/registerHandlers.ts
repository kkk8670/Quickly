// src/socket/registerHandlers.ts
import { Server } from 'socket.io'
import registerPostQuoteHandler from './postquote.socket.js'
import registerQuickBookHandler from './quickbook.socket.js'

const registerSocketHandlers = (io: Server) => {
    io.on('connection', (socket) => {
        console.log('✅ socket connected:', socket.id)

        registerQuickBookHandler(socket)
        registerPostQuoteHandler(socket)

    })
}

export default registerSocketHandlers