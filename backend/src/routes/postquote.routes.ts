import { FastifyInstance } from 'fastify';
import * as PostQuoteController from '@/controllers/postquote.controller.js';

const postQuoteRoutes = async (app: FastifyInstance) => {
    // app.get('/post-quote/pricing', QuickBookController.getPricingInfo);
    app.post('/post-quote/create', PostQuoteController.createAndPidding);
    // app.get('/:id', PostQuoteController.getPostQuoteOrder);

    app.post('/post-quote/:jobId/confirmed', PostQuoteController.getPostQuoteOrder);
}

export default postQuoteRoutes

export const mockQuoteRoute = async (app: FastifyInstance) => {
    app.post('/post-quote/mock-bid', async (req, res) => {
        const { jobId } = req.body as { jobId: string };
        console.log('[MOCK BID] jobId:', jobId);
        const fakeBid = {
            id: crypto.randomUUID(),
            providerName: `Provider ${Math.floor(Math.random() * 10 + 1)}`,
            rating: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)),
            message: 'We can finish this fast!',
            estimatedTime: `${Math.floor(Math.random() * 5 + 1)} days`,
            price: Math.floor(Math.random() * 500 + 100),
        };

        app.io.to(jobId).emit('new_bid', fakeBid);
        console.log('[MOCK BID] return:', fakeBid);
        return res.send({ status: 'ok', sent: fakeBid });
    });
}