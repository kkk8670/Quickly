// app/customer/quick-book/waiting/[jobId]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {useJobStore} from '@/stores/jobStore'
import { useSocket } from '@/hooks/useSocket';
import { JobInfoCard, StatusCard, InfoRow } from '@/components/BookStatusCard'
import type { Job } from '@/types'
import { Provider } from '@/types'


const mockJob = {
    id: 'mock-job-001',
    type: 'QUICK_BOOK',
    serviceType: 'Cleaning',
    address: '123 Mock Street',
    price: 50,
    status: 'PENDING',
    createdAt: new Date().toISOString(),
    customerId: 'customer_001',
};

export default function QuickBookWaitingPage() {
    const router = useRouter();
    const socket = useSocket();
    const params = useParams();
    const jobId = params.jobId
    // const { job } = useJobStore();
    // const [job, setJob] = useState(mockJob);
    const [job, setJob] = useState<Job | null>(null);
    const [countdown, setCountdown] = useState(30);
    const [status, setStatus] = useState('waiting');
    const [matchedProvider, setMatchedProvider] = useState<Provider | null>(null);
    const [socketReady, setSocketReady] = useState(false);
    
    

    useEffect(() => {
        if (!jobId) return;

        fetchJobDetails();
    }, [jobId]);

    useEffect(() => {
        if (!socket) return;

        const handleConnect = () => {
            setSocketReady(true);
        };
        const handleError = (err: any) => {
            console.error('Socket connection error:', err);
            setSocketReady(false);
        };

        socket.on('connect', handleConnect);
        socket.on('connect_error', handleError);
        socket.on('connect_timeout', handleError);

        return () => {
            socket.off('connect', handleConnect);
            socket.off('connect_error', handleError);
            socket.off('connect_timeout', handleError);
        };
    }, [socket]);

    useEffect(() => {
        if (!jobId || !socket) return;
        const handleMatched = (data: any) => {
            console.log('[socket] matched event received', data);
            if (data.jobId === jobId) {
                setStatus('matched');
                setMatchedProvider(data.providerInfo);
            }
        };

        socket.on('job_matched', handleMatched);

        const handleTimeout = (data: any) => {
            console.log('[socket] timeout event received', data);
            if (data.jobId === jobId) {
                setStatus('timeout');
            }
        };
        socket.on('job_timeout', handleTimeout);

        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    setStatus('timeout');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            clearInterval(timer);
            socket.off('job_matched', handleMatched);
            socket.off('job_timeout', handleTimeout);
        };
    }, [jobId, socket]);

    const fetchJobDetails = async () => {
        try {
            console.log('Fetching job details with jobId:', jobId);
            const response = await fetch(`http://localhost:3001/api/jobs/${jobId}`);
            if (!response.ok) {
                const text = await response.text();
                console.error('Response not OK:', response.status, text);
                return;
            }
            const result = await response.json();
            console.log('so Job result:', result);
            if (result.success) {
                setJob(result.data);
                if (result.data.status === 'MATCHED') {
                    setStatus('matched');
                    // TODO: get provider
                }
            }
        } catch (error) {
            console.error('Failed to get order details:', error);
        }
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };


    // const handleTestClick = () => {
    //     router.push('/quick-book/confirmed');
    // };


    return (
        <div className="container mx-auto p-4 max-w-md space-y-6">
            {job && <JobInfoCard job={job} />}

            {!socketReady ? (
                <div className="text-center text-gray-400">Connecting to WebSocket...</div>
            ) : (<>
                {status === 'waiting' && (
                    <StatusCard icon="🔍" title="Looking for the right provider" color="yellow">
                        <p className="text-gray-600">We are finding the best match for your request.</p>
                        <div className="text-2xl font-mono text-blue-600">{formatTime(countdown)}</div>
                        <p className="text-sm text-gray-500">Estimated waiting time</p>
                        <div className="flex justify-center mt-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        </div>
                    </StatusCard>
                )}

                {status === 'matched' && matchedProvider && (
                    <StatusCard icon="✅" title="Matched Successfully!" color="green">
                        <div className="bg-white rounded-xl shadow p-4 space-y-1 text-left text-sm">
                            <InfoRow label="Provider" value={matchedProvider.name} />
                            <InfoRow label="Rating" value={`${matchedProvider.rating} ⭐`} />
                            <InfoRow label="Phone" value={matchedProvider.phone} />
                        </div>
                        <p className="text-gray-600">The provider is on the way. Please keep your phone available.</p>
                    </StatusCard>
                )}

                {status === 'timeout' && (
                    <StatusCard icon="⏰" title="No provider available for now" color="red">
                        <p className="text-gray-600 mb-4">Please try again later or adjust your requirements.</p>
                        <button
                            onClick={() => router.push('/customer/quick-book')}
                            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
                        >
                            Rebook
                        </button>
                    </StatusCard>
                )}
            </>)}
        </div>
    );
}
