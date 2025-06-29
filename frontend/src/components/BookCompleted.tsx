'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

type BookProps = {
    flow: 'quick-book' | 'post-quote'
}

export default function BookingCompleted({ flow }: BookProps) {
    const { orderId } = useParams();


    const order = {
        category: 'Clean',
        provider: { name: 'Tony' },
        price: 85,
        startTime: new Date('2025-06-25T14:00:00'),
        endTime: new Date('2025-06-25T15:30:00'),
        completedAt: new Date('2025-06-25T15:30:00'),
        hasReviewed: false,
        review: {
            rating: 5,
            comment: 'good',
            createdAt: new Date('2025-06-25T16:00:00'),
        },
    };

    const formatDate = (date: Date) =>
        date.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });

    const getServiceDuration = (start: Date, end: Date) => {
        const duration = Math.round((end.getTime() - start.getTime()) / 60000);
        return `${Math.floor(duration / 60)}h ${duration % 60}m`;
    };

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    const submitReview = () => {
        alert(`Submit evaluation: ${rating}, comment: ${comment}`);
        // api
    };

    return (
        <div className="p-6 space-y-8 max-w-2xl mx-auto">

            <header className="space-y-1 text-center">
                <h1 className="text-xl font-bold text-green-600">✅ Services completed</h1>
                <p className="text-sm text-gray-500">Completion time: {formatDate(order.completedAt)}</p>
            </header>

            <section className="bg-gray-50 rounded p-4 space-y-2">
                <h2 className="font-semibold text-gray-800">Service Information </h2>
                <p><span className="font-medium">Service Type: </span>{order.category}</p>
                <p><span className="font-medium">Service Provider: </span>{order.provider.name}</p>
                <p><span className="font-medium">Service Price: </span>${order.price}</p>
                <p><span className="font-medium">Service Duration:</span>{getServiceDuration(order.startTime, order.endTime)}</p>
            </section>

            <section className="space-y-4">
                <h2 className="font-semibold text-gray-800">Evaluation Services</h2>

                {!order.hasReviewed ? (
                    <div className="space-y-4 bg-white shadow p-4 rounded">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Service Rating</label>
                            <div className="flex space-x-1 text-2xl">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        onClick={() => setRating(star)}
                                        className={`cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-300'
                                            }`}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows={3}
                                className="w-full border rounded p-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                                placeholder="Write down your review (optional)"
                            />
                        </div>


                        <div className="text-right">
                            <button
                                onClick={submitReview}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="bg-gray-50 rounded p-4 space-y-2">
                        <p><span className="font-medium">score: </span>{order.review.rating} </p>
                        <p><span className="font-medium">comment: </span>{order.review.comment}</p>
                        <p className="text-sm text-gray-500">submit time: {formatDate(order.review.createdAt)}</p>
                    </div>
                )}
            </section>
        </div>
    );
}
