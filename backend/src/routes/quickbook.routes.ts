import { FastifyInstance } from 'fastify';
import * as QuickBookController from '@/controllers/quickbook.controller.js';

const quickBookRoutes = async (app: FastifyInstance) => {
    // app.get('/quick-book/pricing', QuickBookController.getPricingInfo);
    app.post('/quick-book/create', QuickBookController.createAndMatch);
    app.get('/:id', QuickBookController.getQuickBookOrder);

    // app.post('/quick-book/grab', QuickBookController.grabJob);
}

export default quickBookRoutes