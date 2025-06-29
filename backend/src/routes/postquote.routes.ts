import { FastifyInstance } from 'fastify';
import * as PostQuoteController from '@/controllers/postquote.controller.js';

const postQuoteRoutes = async (app: FastifyInstance) => {
 
    app.post('/post-quote/create', PostQuoteController.createAndPidding);

    app.post('/post-quote/:jobId/confirmed', PostQuoteController.getPostQuoteOrder);

    app.post('/post-quote/mock-bid', PostQuoteController.mockBidQuote)
}

export default postQuoteRoutes

