import { FastifyInstance } from 'fastify';
import * as QuickBookController from '@/controllers/quickbook.controller.js';
import { Server } from 'socket.io';


interface IOOptions {
    io: Server;  
    prefix?: string;  
}

const quickBookRoutes = async (app: FastifyInstance,  options:IOOptions) => {
    const { io } = options;
    // app.get('/quick-book/pricing', QuickBookController.getPricingInfo);
    app.post('/quick-book/create', async (request, reply) => {
        return QuickBookController.createAndMatch(request, reply, io);
    });
    app.get('/:id', async (request, reply) => {
        return QuickBookController.getQuickBookOrder(request, reply, io);
    });

    // app.post('/quick-book/grab', QuickBookController.grabJob);
}

export default quickBookRoutes