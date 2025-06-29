'use client';

import { useState, useEffect } from 'react';
import { socket } from '@/lib/socket';

export default function PostQuotePage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        socket.on('job-created', (job) => {
            setFeedback('Job posted!');
            console.log('Job Created:', job);
        });

        return () => {
            socket.off('job-created');
        };
    }, []);

    const submitJob = () => {
        if (!title && !description) {
            setFeedback('Please enter a title or description');
            return;
        }

        socket.emit('create-job', {
            type: 'POST_QUOTE',
            customerId: 'customer_002', // mock ID
            title
 
        });
    };

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-xl font-bold">Post a Job (Quote Mode)</h1>

            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Job Title"
                className="border p-2 w-full"
            />
{/* 
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Job Description"
                className="border p-2 w-full"
            /> */}

            <button
                onClick={submitJob}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Submit
            </button>

            {feedback && <p className="text-green-600">{feedback}</p>}
        </div>
    );
}