'use client';

import { useEffect, useState } from 'react';
import { socket } from '@/hooks/useSocket';

const SubmitBidPage = ({ searchParams }: { searchParams?: { jobId?: string } }) => {
    const jobIdFromQuery = searchParams?.jobId || '';
    const [jobs, setJobs] = useState<any[]>([]);
    const [jobId, setJobId] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [feedback, setFeedback] = useState('');
    const [jobTitle, setJobTitle] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/api/jobs')
            .then(res => res.json())
            .then((data) => {
                setJobs(data);
                if (jobIdFromQuery) {
                    setJobId(jobIdFromQuery);
                }
            })
            .catch(console.error);
    }, [jobIdFromQuery]);

    useEffect(() => {
        socket.on('bid-created', (bid) => {
            setFeedback('Bid sent!');
            console.log('Bid Created:', bid);
        });

        socket.on('bid-error', (error) => {
            setFeedback('Error: ' + JSON.stringify(error));
        });

        return () => {
            socket.off('bid-created');
            socket.off('bid-error');
        };
    }, []);

    const submitBid = () => {
        if (!jobId || !amount) {
            setFeedback(' Job ID and amount are required');
            return;
        }

        socket.emit('create-bid', {
            jobId,
            providerId: 'provider_001',
            amount: Number(amount),
            message,
        });
    };

    const selectedJob = jobs.find((job) => job.id === jobId);

    return (
        <div className="p-4 space-y-4">
            <h1 className="text-xl font-bold">Post a Quote</h1>

            {selectedJob && (
                <div className="mb-4">
                    <p>
                        <span className="text-gray-600">Job:</span>{' '}
                        <span className="font-semibold">
                            {selectedJob.title || 'Untitled'}
                        </span>
                    </p>
                </div>
            )}

            {!jobIdFromQuery && (
                <select
                    value={jobId}
                    onChange={(e) => setJobId(e.target.value)}
                    className="border p-2 w-full mb-4"
                >
                    <option value="">Select a Job</option>
                    {jobs.map((job) => (
                        <option key={job.id} value={job.id}>
                            {job.title || job.description || 'Untitled'} ({job.id.slice(0, 6)})
                        </option>
                    ))}
                </select>
            )}

            <input
                type="number"
                placeholder="Bid amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border p-2 w-full"
            />

            <input
                type="text"
                placeholder="Message (optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border p-2 w-full"
            />

            <button
                onClick={submitBid}
                className="bg-blue-500 text-white p-2 rounded"
            >
                Submit Bid
            </button>

            {feedback && <p className="text-sm text-green-600">{feedback}</p>}
        </div>
    );
}

export default SubmitBidPage