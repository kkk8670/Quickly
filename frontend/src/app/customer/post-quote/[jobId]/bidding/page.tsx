'use client';

import { useState, useEffect } from 'react';
import { useSocket } from '@/hooks/useSocket';
import { useRouter, useParams } from 'next/navigation';
import type { Bid } from '@/types'
import { useBidsStore, useSelectedBidStore } from '@/stores/jobStore'


const PostQuoteBidding = () => {
    const params = useParams();
    const jobId = params.jobId
    const router = useRouter();
    const socket = useSocket();
    // const [bids, setBids] = useState<Bid[]>([]);
    const { bids, appendBid } = useBidsStore()
    const [currentRound, setCurrentRound] = useState(0);
    const [autoAcceptPrice, setAutoAcceptPrice] = useState('');
    const [autoAcceptEnabled, setAutoAcceptEnabled] = useState(false);
    const { setSelectedBid } = useSelectedBidStore();

    const savedFormString = sessionStorage.getItem('quote-draft');
    const savedForm = savedFormString ? JSON.parse(savedFormString) : null;
    const geneMockBids = async () => {

        console.log('[Click] Trying to generate fake bid');
        await fetch('http://localhost:3001/api/jobs/post-quote/mock-bid', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jobId: jobId, budgetRange: savedForm.budgetRange }),
        });
    }

    useEffect(() => {
        // const interval = setInterval(() => {
        //     const fakeBid = {
        //         id: Math.random().toString(36).slice(2),
        //         providerName: `Provider ${Math.floor(Math.random() * 10 + 1)}`,
        //         rating: (Math.random() * 1.5 + 3.5).toFixed(1),
        //         message: 'We can complete this quickly, feel free to contact us!',
        //         estimatedTime: `${Math.floor(Math.random() * 5 + 1)} days`,
        //         price: Math.floor(Math.random() * 500 + 100),
        //     };

        //     setBids(prev => {
        //         const newBids = [...prev, fakeBid];
        //         if (autoAcceptEnabled && fakeBid.price <= parseInt(autoAcceptPrice)) {
        //             handleAutoAccept(fakeBid);
        //         }
        //         return newBids.sort((a, b) => a.price - b.price);
        //     });
        // }, 8000);

        // const roundInterval = setInterval(() => {
        //     setCurrentRound(prev => (prev < 3 ? prev + 1 : prev));
        // }, 10000);

        if (!jobId) return;

        if (!socket.connected) {
            console.log('[Socket] Attempting to connect...');
            socket.connect();
        }
        console.log('Emitting join_room', jobId);
        socket.emit('join_room', { jobId });

        // socket.on('new_bid', (bid) => {
        //     console.log('[SOCKET] Received new bid:', bid);
        //     setBids((prev) => {
        //         const newList = [...prev, bid].sort((a, b) => a.price - b.price);
        //         if (autoAcceptEnabled && bid.price <= parseInt(autoAcceptPrice)) {
        //             handleAutoAccept(bid);
        //         }
        //         return newList;
        //     });
        // });
        const handleNewBid = (bid: Bid) => {
            console.log('[SOCKET] Received new bid:', bid);
            appendBid(bid);

            if (autoAcceptEnabled && bid.price <= parseInt(autoAcceptPrice)) {
                handleAutoAccept(bid);
            }
        };

        socket.on('new_bid', handleNewBid);
        socket.on('round_update', (round: number) => {
            setCurrentRound(round);
        });

        socket.on('connect', () => {
            console.log('[Socket] Connected!');
        });

        socket.on('connect_error', (error) => {
            console.error('[Socket.IO] Connection error:', error);
        });
        return () => {
            // clearInterval(interval);
            // clearInterval(roundInterval);
            socket.emit('leave_room', { jobId });
            socket.off('new_bid');
            socket.off('round_update');

        };
    }, [jobId, autoAcceptEnabled, autoAcceptPrice]);

    const handleAutoAccept = (bid: Bid) => {
        // alert(`Auto-accepted bid: ¥${bid.price} - ${bid.providerName}`);
        socket.emit('auto_accept_bid', { jobId, bidId: bid.id });
        setSelectedBid(bid);
        router.push(`/customer/post-quote/${jobId}/selected/${bid.id}`);
    };

    const handleSelectBid = (bid: Bid) => {
        socket.emit('select_bid', { jobId, bidId: bid.id });
        setSelectedBid(bid);
        router.push(`/customer/post-quote/${jobId}/selected/${bid.id}`);
    };

    const getRoundText = (round: number) => {
        switch (round) {
            case 1:
                return 'Targeting top-rated providers (⭐ ≥ 4.5)';
            case 2:
                return 'Reaching out to reputable providers (⭐ ≥ 4.0)';
            case 3:
                return 'Broadcasting to all available providers';
            default:
                return 'Preparing to broadcast...';
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            {/* Round + Auto-Accept */}
            <section className="space-y-4 bg-white shadow rounded-2xl p-6">
                <h2 className="text-xl font-bold text-gray-800">📡 Matching Providers</h2>

                {/* Round Info */}
                <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
                    <div className="flex items-center gap-2 text-blue-700 font-medium">
                        <span className="text-lg">🔄</span>
                        <span>Round {currentRound}: {getRoundText(currentRound)}</span>
                    </div>
                </div>

                {/* Auto-Accept Settings */}
                <div className="rounded-lg bg-gray-50 border border-gray-200 p-4 space-y-2">
                    <label className="flex items-center gap-2 font-medium text-gray-700">
                        <input
                            type="checkbox"
                            checked={autoAcceptEnabled}
                            onChange={(e) => setAutoAcceptEnabled(e.target.checked)}
                            className="accent-blue-600"
                        />
                        Enable Auto-Accept
                    </label>
                    {autoAcceptEnabled && (
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-500">Auto-accept bids ≤</span>
                            <input
                                type="number"
                                value={autoAcceptPrice}
                                onChange={(e) => setAutoAcceptPrice(e.target.value)}
                                className="border rounded px-2 py-1 w-24 text-center"
                                placeholder="Price"
                            />
                            <span className="text-gray-500">¥</span>
                        </div>
                    )}
                </div>

                <button
                    onClick={geneMockBids}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded shadow text-sm"
                >
                    ➕ Generate Mock Bid
                </button>
            </section>

            {/* Stats Overview */}
            <section className="grid grid-cols-3 gap-4 text-center text-sm">
                <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-xl font-bold text-green-600">{bids.length}</div>
                    <div className="text-green-700">Total Bids</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-xl font-bold text-blue-600">
                        {bids.length > 0 ? `¥${Math.min(...bids.map(b => b.price))}` : '--'}
                    </div>
                    <div className="text-blue-700">Lowest Price</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                    <div className="text-xl font-bold text-purple-600">
                        {bids.length > 0
                            ? Math.max(...bids.map(b => b.providerRating ?? 0)).toFixed(1)
                            : '--'}
                    </div>
                    <div className="text-purple-700">Highest Rating</div>
                </div>
            </section>

            {/* Bid List */}
            <section className="bg-white shadow rounded-2xl">
                <div className="border-b px-6 py-4 font-semibold text-gray-800">
                    📥 Received Bids
                </div>

                <div className="divide-y">
                    {bids.length === 0 ? (
                        <div className="text-center p-10 text-gray-500 text-sm space-y-2">
                            <div className="text-4xl">⏳</div>
                            <p>Waiting for providers to respond...</p>
                        </div>
                    ) : (
                        bids.map(bid => (
                            <div key={bid.id} className="p-6 hover:bg-gray-50 transition">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <div className="font-medium text-gray-900">{bid.providerName}</div>
                                        <div className="text-sm text-gray-600 flex items-center gap-1">
                                            ⭐ {bid.providerRating}
                                        </div>
                                        <div className="text-sm text-gray-500">{bid.message}</div>

                                    </div>

                                    <div className="text-right space-y-2">
                                        <div className="text-green-600 font-bold text-xl">¥{bid.price}</div>
                                        <button
                                            onClick={() => handleSelectBid(bid)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded shadow text-sm"
                                        >
                                            Select
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default PostQuoteBidding;
