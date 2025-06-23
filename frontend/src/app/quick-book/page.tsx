// src/app/quick-book/page.tsx
'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

type Job = {
    id: string;
    type: string;
    status: string;
    customerId: string;
    description: string;
    createdAt: string;
};

export default function QuickBookPage() {

    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {
        const socket = io('http://localhost:3001', {
            transports: ['websocket'],
        });

        socket.on('connect', () => {
            console.log('Connected to WS server');
        });

        socket.on('new-job', (job: Job) => {
            if (job.type === 'QUICK_BOOK') {
                console.log('Received new job:', job);
                setJobs((prev) => [job, ...prev]);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <main className="p-4">
            <h1 className="text-xl font-bold mb-4">Real-time book List</h1>
            <ul className="space-y-2">
                {jobs.map((job) => (
                    <li key={job.id} className="p-3 border rounded shadow">
                        <p> {job.id}</p>
                        <p> Customer: {job.customerId}</p>
                        <p> content: {job.description}</p>
                        <p> time: {new Date(job.createdAt).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </main>
    );
}