import { Server as SocketIOServer } from 'socket.io'
import { FastifyInstance } from 'fastify'

const socketPlugin = async (app: FastifyInstance) => {
    const io = new SocketIOServer(app.server, {
        cors: {
            origin: "*",  
            methods: ["GET", "POST"]
        }
    })
    
    app.decorate('io', io)
    
    io.on('connection', (socket) => {
        console.log('Provider connected:', socket.id)
    })
    
 
    app.addHook('onClose', async () => {
        io.close()
    })
}

export default socketPlugin