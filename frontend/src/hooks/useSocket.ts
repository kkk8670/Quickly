import { io, Socket } from 'socket.io-client';
import { useEffect, useRef } from 'react';
import useJobStore from '@/stores/jobStore';
import type { Job } from '@/types'


export const socket = io('http://localhost:3001', {
  transports: ['websocket']
});

// export const useSocket = (userId: string | null) => {
export const useSocket = () => {
  const socket = useRef<Socket | null>(null);
  const { updateJobStatus } = useJobStore();
  const userId = 'current-user-id';

  useEffect(() => {
    // if (!userId) return;
    const userId = 'current-user-id';

    socket.current = io('http://localhost:3001');

    socket.current.emit('join', userId);


    // socket.current.on('job_matched', (job: Job) => {
    //   updateJobStatus(job.id, 'MATCHED', { providerId: job.providerId });
    // });

    // socket.current.on('new_quick_book', (job: Job) => {
    //   console.log('New quick book job:', job);
    // });

    // socket.current.on('new_post_quote', (job: Job) => {
    //   console.log('New post quote job:', job);
    // });

    return () => {
      socket.current?.disconnect();
    };
  }, [userId, updateJobStatus]);

  // const grabJob = (jobId: string) => {
  //   socket.current?.emit('grab_job', { jobId });
  // };

  // return { socket: socket.current, grabJob };
  return socket.current;
};