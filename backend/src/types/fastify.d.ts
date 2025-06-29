import 'fastify';
import { PrismaClient } from '@prisma/client';
import { Server as SocketIOServer } from 'socket.io';

declare module 'fastify' {
    interface FastifyInstance {
        prisma: PrismaClient;
        io: SocketIOServer;
    }
}