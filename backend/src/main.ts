import 'tsconfig-paths/register'
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { jobRoutes } from '@/modules/jobs/jobs.routes';
import { prismaPlugin } from '@/plugins/prisma'


const bootstrap = async () => {
    const app = Fastify({ logger: true })

    await app.register(cors)
    await app.register(prismaPlugin)
    await app.register(jobRoutes)

    await app.listen({ port: 3001, host: '0.0.0.0' })
}
bootstrap()