// main.ts
import Fastify from 'fastify'
import cors from '@fastify/cors'
import fastifyIO from 'fastify-socket.io'
import registerAllRoutes from './routes/registerRoutes.js'
import registerSocketHandlers from './socket/registerHandlers.js'
import { setIO } from './socket/socketState.js'


const app = Fastify({ logger: true })

await app.register(cors, {
    origin: ['http://localhost:3000'],
    credentials: true,
});

await app.register(fastifyIO.default, {
    cors: {
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

await registerAllRoutes(app, app.io);

app.ready().then(() => {
    setIO(app.io);
    registerSocketHandlers(app.io)
    console.log('✅ WebSocket handlers registered.')
})

console.log("app.routes:", app.printRoutes());


await app.listen({ port: 3001, host: '0.0.0.0' })
console.log('Backend running on http://localhost:3001')
