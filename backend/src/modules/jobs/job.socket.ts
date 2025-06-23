// socket.ts
import { Server, Socket } from 'socket.io';
import { createJob } from './job.service.js';
import { CreateJobSchema } from './job.schema.js';

export const registerJobSocket = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log('[Job] WebSocket connected', socket.id);

        socket.on('create-job', async (jobData) => {
            console.log('Received job:', jobData);
            const result = CreateJobSchema.safeParse(jobData);

            if (!result.success) {
              socket.emit('job-error', result.error.format());
              return;
            }
            const job = await createJob(jobData, io);
            // pass back
            socket.emit('job-created', job);
            console.log('Sent job-created');
            // broadcast to other client
            // io.emit('new-job', job);
            socket.broadcast.emit('new-job', job);
            console.log('Broadcast new-job');
        });
        socket.on('disconnect', () => {
            console.log('❌ WebSocket disconnected:', socket.id);
        });
    });
};