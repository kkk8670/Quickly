
import { FastifyInstance } from 'fastify';
import postQuoteRoutes, { mockQuoteRoute } from '@/routes/postquote.routes.js'
import quickBookRoutes from '@/routes/quickbook.routes.js'

const registerAllRoutes = async (app: FastifyInstance) => {
    await app.register(quickBookRoutes, { prefix: '/api/jobs' });
    await app.register(postQuoteRoutes, { prefix: '/api/jobs' });
    await app.register(mockQuoteRoute, { prefix: '/api/jobs' });
};

export default registerAllRoutes