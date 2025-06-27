'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { bids, jobs } from '@/mock/testData'


export default function PostQuoteBiddingPage() {
    const router = useRouter();
    const { jobId } = useParams();

    const job = jobs[0]



    const [sort, setSort] = useState<'score' | 'price' | 'rating'>('score');

    const sortedBids = [...bids.slice(0, 3)].sort((a, b) => {
        if (sort === 'price') return a.price - b.price;
        if (sort === 'rating') return b.provider.rating - a.provider.rating;
        return b.rankScore - a.rankScore;
    });

    const selectBid = (bidId: string) => {
        alert(`You have selected ID: ${bidId}`);
        // router.push(`/post-quote/confirmed/${bidId}`);
    };

    const viewProfile = (providerId: string) => {
        alert(`View the service provider profile: ${providerId}`);
        // router.push(`/provider/${providerId}`);
    };


    const handleTestClickConfirm = () => {
        router.push('/post-quote/confirmed');
    };

    return (
        <div className="p-6 space-y-8 max-w-2xl mx-auto">

            <header className="space-y-1 text-center">
                <h1 className="text-xl font-bold text-gray-800">Select Service Provider</h1>
                <div className="text-gray-600 text-sm">
                    <p>🛠️ {job.category}</p>
                    <p>📍 {job.address}</p>
                </div>
            </header>

            <section className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-gray-800">Received {sortedBids.length} offers</h2>
                    <div className="space-x-2 text-sm">
                        {(['score', 'price', 'rating'] as const).map((key) => (
                            <button
                                key={key}
                                onClick={() => setSort(key)}
                                className={`px-2 py-1 rounded ${sort === key ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                            >
                                {key === 'score'
                                    ? 'Combined Sort'
                                    : key === 'price'
                                        ? 'by price'
                                        : 'by rating'}
                            </button>
                        ))}
                    </div>
                </div>

                {sortedBids.map((bid, index) => (
                    <div key={bid.id} className="bg-white shadow rounded p-4 space-y-3">
                        <div className="flex justify-between items-center text-sm text-gray-500">
                            <span>Quotation #{index + 1}</span>
                            <div className="text-right">
                                <p className="text-blue-600 text-lg font-bold">${bid.price}</p>
                                <p>Composite score: {bid.rankScore}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <img
                                src={bid.provider.avatar}
                                alt="avatar"
                                className="w-12 h-12 rounded-full bg-gray-200"
                            />
                            <div>
                                <p className="font-semibold">{bid.provider.name}</p>
                                <p className="text-sm text-gray-600">⭐ {bid.provider.rating}</p>
                                <p className="text-sm text-gray-500">
                                    {bid.provider.completedJobs} | {bid.provider.experience}years of experience
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center text-sm text-gray-600 space-x-2">
                            <span>⏰</span>
                            <span>Estimated {bid.etaHours} hours to complete</span>
                        </div>

                        {bid.note && (
                            <div className="text-sm text-gray-700">
                                <p className="font-semibold">💡 Service Description: </p>
                                <p>{bid.note}</p>
                            </div>
                        )}

                        <div className="flex gap-3 pt-2">
                            <button
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                                onClick={() => selectBid(bid.id)}
                            >
                                Select this provider
                            </button>
                            <button
                                className="flex-1 bg-gray-100 hover:bg-gray-200 py-2 rounded"
                                onClick={() => viewProfile(bid.provider.id)}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </section>

            <div className="flex gap-4 justify-end pt-4">
                <a
                    href={`/customer/post-quote/waiting/${jobId}`}
                    className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-center"
                >
                    Return to Waiting
                </a>
                <button className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white">
                    Cancel
                </button>
                <button
                    onClick={handleTestClickConfirm}
                    className="w-full mt-4 bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700">
                    testConfirm
                </button>
            </div>
        </div>
    );
}
