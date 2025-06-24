'use client';

import { useState } from 'react';
import { socket } from '@/lib/socket';

const QuickBookPage = () => {
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title) return;

        socket.emit('create-job', {
            type: 'QUICK_BOOK',
            customerId: 'cus_test',
            title,
        });

        setMessage('Submitted successfully!');
        setTitle('');
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-2">appointment</h1>
            <form onSubmit={handleSubmit}>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Please enter your requirements"
                    className="border p-2 w-full "
                />
                <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                    submit
                </button>
            </form>
            {message && <p className="mt-2 text-green-600">{message}</p>}
        </div>
    );
}

export default QuickBookPage