'use client';

import { useEffect, useState } from 'react';
import { socket } from '@/hooks/useSocket';
import type { Job } from '@/types'

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
            {jobs.length === 0 && <p>No book jobs available.</p>}
            <ul>
                {jobs.map((job) => (
                    <div key={job.id} className="border p-3 mb-2 rounded shadow">
                        <p className="text-gray-600 text-sm">create time: {job.createdAt}</p>
                        <p className="font-semibold">Title: {job.title}</p>
                        <p className="text-sm text-blue-600">Status:{job.status}</p>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default JobBoardPage