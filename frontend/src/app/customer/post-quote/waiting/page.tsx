// app/post-quote/waiting/[jobId]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useJobStore } from '@/stores/jobStore'

export default function PostQuoteWaitingPage() {

    const router = useRouter();
    const { jobId } = useParams();
    const { job } = useJobStore();
    const [elapsed, setElapsed] = useState(0);
    const [bids, setBids] = useState<any[]>([]);
    const [sortBy, setSortBy] = useState('score');

    useEffect(() => {
        const timer = setInterval(() => setElapsed((prev) => prev + 1), 60000);
        return () => clearInterval(timer);
    }, []);

    const handleTestClickBid = () => {
        router.push('/post-quote/bidding');
    };

    const handleTestClickConfirm = () => {
        router.push('/post-quote/confirmed');
    };

    return (
        <div className="p-6 space-y-8 max-w-2xl mx-auto">

            <h1 className="text-xl font-bold text-start text-gray-800 whitespace-pre-line"><p>✅ Requirements have been posted  </p>
                <p>✅ Quotes are being received...</p></h1>


            <section className="bg-white shadow rounded p-4 space-y-2">
                <p className="text-sm text-gray-500">Being pushed to quality service providers within 3 kilometers</p>
                <div className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                    <div className="text-blue-600">● pushing 1 round:   (0-5 minutes)</div>
                    <div>pushing 2 round: (5-15 minutes)</div>
                    <div>pushing 3 round (15 minutes later)</div>
                </div>
                <br />
                <p className="text-sm text-gray-500">Published {elapsed} minutes </p>
            </section>

            <section className="bg-gray-50 rounded shadow p-4 space-y-1">
                <h2 className="font-semibold text-gray-800">📋 Your requirements</h2>
                <p>Service Type: {job?.serviceType}</p>
                <p>Service Address：{job?.address}</p>
                <p>Budget Range: ${job?.budgetRange[0]} - ${job?.budgetRange[0]}</p>
                <p>Service Time: {job?.timeOption}</p>
            </section>

            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-gray-800">📮 Quotation Received（{bids.length}）</h2>
                    <select
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="score">Ranking</option>
                        <option value="price">by price</option>
                        <option value="distance">by distance</option>
                    </select>
                </div>

                {bids.length === 0 ? (
                    <div className="text-center text-gray-500 py-10 space-y-2">
                        <div className="text-4xl">⏳</div>
                        <p>No quotes at this time, please be patient and wait for the service provider to respond...</p>
                    </div>
                ) : (
                    <ul className="space-y-4">
                        {bids.map((bid) => (
                            <li key={bid.id} className="bg-white shadow rounded p-4 space-y-2">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-gray-300 rounded-full" />
                                    <div>
                                        <p className="font-medium">{bid.provider.name}</p>
                                        <p className="text-sm text-gray-500">⭐ {bid.provider.rating} / {bid.provider.completedJobs}  </p>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-700 space-y-1">
                                    <p>Quote: ${bid.price}</p>
                                    <p>Expected completion time: within {bid.eta} hours </p>
                                    <p>Note: {bid.note}</p>
                                </div>
                                <div className="flex space-x-2 pt-2">
                                    <button className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">
                                        Select
                                    </button>

                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section className="flex justify-end gap-4">
                <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">Modify Requirements</button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Cancel the release</button>
                <button
                    onClick={handleTestClickBid}
                    className="w-full mt-4 bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700">
                    testBid
                </button>
                <button
                    onClick={handleTestClickConfirm}
                    className="w-full mt-4 bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700">
                    testConfirm
                </button>
            </section>
        </div>
    );
}