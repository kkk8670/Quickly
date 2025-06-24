'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Job } from '@/types'
import { socket } from '@/lib/socket';

const QuoteBoardPage = () => {
    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/jobs')
            .then(res => res.json())
            .then((data: Job[]) => {
                const postQuoteJobs = data.filter(job => job.type === 'POST_QUOTE');
                setJobs(postQuoteJobs);
            });

        socket.on('new-job', (job: Job) => {
            console.log('New job received', job);
            if (job.type === 'POST_QUOTE') {
                setJobs(prev => [job, ...prev]);
            }
        });

        return () => {
            socket.off('new-job');
        };
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4"> Quote Board</h1>
            {jobs.length === 0 && <p>No quote jobs available.</p>}
            <ul className="space-y-4">
                {jobs.map(job => (
                    <li key={job.id} className="p-4 border rounded shadow">
                        <h2 className="text-lg font-semibold">
                            {job.title}
                        </h2>
                        <div className="text-sm text-gray-500">
                            <strong>Created At:</strong>
                            {new Date(job.createdAt).toLocaleString()}
                        </div>
                        <div><strong>Status:</strong> {job.status}</div>
                        <Link
                            href={`/quote-board/${job.id}`}
                            className="text-blue-500 hover:underline mt-2 inline-block"
                        >
                            View & Bid →
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default QuoteBoardPage