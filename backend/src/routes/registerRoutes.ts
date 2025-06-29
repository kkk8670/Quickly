
import { FastifyInstance } from 'fastify';
import postQuoteRoutes from '@/routes/postquote.routes.js'
import quickBookRoutes from '@/routes/quickbook.routes.js'
import { Server } from 'socket.io';


const registerAllRoutes = async (app: FastifyInstance, io: Server) => {
    await app.register(quickBookRoutes, { prefix: '/api/jobs', io });
    await app.register(postQuoteRoutes, { prefix: '/api/jobs', io });

};

export default registerAllRoutes