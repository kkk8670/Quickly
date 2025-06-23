'use client';

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

type Job = {
    id: string;
    type: string;
    status: string;
    customerId: string;
    title: string;
    createdAt: string;
};

const socket = io('http://localhost:3001', {
    transports: ['websocket'],
});

const JobBoardPage = () => {
    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/jobs')
            .then((res) => res.json())
            .then(setJobs);

        socket.on('new-job', (job: Job) => {
            setJobs((prev) => [job, ...prev]);
        });

        return () => {
            socket.off('new-job');
        };
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Real-time Task List</h1>
            {jobs.map((job) => (
                <div key={job.id} className="border p-3 mb-2 rounded shadow">
                    <p className="text-gray-600 text-sm">create time: {job.createdAt}</p>
                    <p className="font-semibold">Title: {job.title}</p>
                    <p className="text-sm text-blue-600">Status:{job.status}</p>
                </div>
            ))}
        </div>
    );
}

export default JobBoardPage