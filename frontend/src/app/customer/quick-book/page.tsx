'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getTimeRangeFromSlot, getCoordfromAddr } from '@/utils/commonFunc'
import { SERVICE_CATEGORIES, TIME_SLOTS } from '@/lib/constants'
import { useJobStore } from '@/stores/jobStore'


const QuickBookPage = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [category, setCategory] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [address, setAddress] = useState('');
    const [price, setPrice] = useState('');
    const { setCurrentJob } = useJobStore();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('quickBookDraft');
        if (saved) {
            const parsed = JSON.parse(saved);
            setCategory(parsed.category || '');
            setTimeSlot(parsed.timeSlot || '');
            setAddress(parsed.address || '');
            setPrice(parsed.price || '');
        }
    }, []);

    useEffect(() => {
        const data = { category, timeSlot, address, price };
        localStorage.setItem('quickBookDraft', JSON.stringify(data));
    }, [category, timeSlot, address, price]);

    const handleSubmit = async () => {

        const timeRange = getTimeRangeFromSlot(timeSlot)

        const formData = {
            serviceType: category,
            address,
            coordinates: getCoordfromAddr(address),
            timeRange,
            estimatedPrice: Number(price)
        };
        setLoading(true);
        try {
            const res = await fetch('http://localhost:3001/api/jobs/quick-book/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await res.json();
            console.log('jobId from backend:', result);

            if (result.success) {
                setCurrentJob({ id: result.jobId, status: 'PENDING' });
                router.push(`/customer/quick-book/${result.jobId}/waiting`);
            } else {
                alert('booking failed: ' + result.error);
            }
        }
        catch (error) {
            alert('fail');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleTestClick = () => {
        router.push('/quick-book/confirm');
    };


    return (
        <div className="p-6 space-y-8 max-w-xl mx-auto">

            <header className="flex flex-col items-start space-x-4 gap-5">
                <button onClick={() => history.back()} className="text-gray-600">&larr; back</button>
                <h1 className="text-xl font-bold">Quick Book - Arrive within 2 hours</h1>
            </header>


            <div className="space-y-6">
                {/* Select Service Type */}
                <section className="border p-4 rounded shadow space-y-2">
                    <h2 className="text-lg font-semibold">1. Select Service Type</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {SERVICE_CATEGORIES.map(({ key, icon, label }) => (
                            <button
                                key={key}
                                onClick={() => setCategory(key)}
                                className={`p-4 rounded shadow hover:bg-gray-100 ${category === key ? 'border border-blue-500' : 'bg-gray-50'
                                    }`}
                            >
                                <div className="text-3xl">{icon}</div>
                                <div className="mt-2 text-sm">{label}</div>
                            </button>
                        ))}
                    </div>
                </section>

                {/* enter price */}
                <section className="border p-4 rounded shadow space-y-2">
                    <h2 className="text-lg font-semibold">2. Enter the price</h2>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Please enter the price:"
                        className="border p-2 rounded w-full"
                    />
                    <p className="text-sm text-gray-500">Suggested price range：$75 - $95</p>
                </section>

                {/* Select service time */}
                <section className="border p-4 rounded shadow space-y-2">
                    <h2 className="text-lg font-semibold">3. Select Service Time</h2>
                    <div className="flex flex-col gap-2">
                        {TIME_SLOTS.map(({ key, label }) => (
                            <button
                                key={key}
                                onClick={() => setTimeSlot(key)}
                                className={`px-4 py-2 rounded border ${timeSlot === key ? 'bg-blue-500 text-white' : 'bg-white'
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Fill in the address */}
                <section className="border p-4 rounded shadow space-y-2">
                    <h2 className="text-lg font-semibold">4. Address</h2>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Fill in the address "
                        className="border p-2 rounded w-full"
                    />
                </section>

                {/* Next Step */}
                {/* <div>
                    <button
                        onClick={() => setStep(2)}
                        className="w-full bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
                        disabled={!category || !price || !timeSlot || !address}
                    >
                        Confirm Information
                    </button>
                </div> */}

            </div>

            {/* Step 2: Confirm Order */}
            {/* {step === 2 && (
                <div className="border p-6 rounded shadow space-y-4">
                    <h2 className="text-lg font-semibold">Confirm Booking Information</h2>
                    <ul className="text-sm space-y-1">
                        <li>Service Type: {getCategoryLabel(category)}</li>
                        <li>Service Time: {getTimeSlotLabel(timeSlot)}</li>
                        <li>Service Price: ${price}</li>
                        <li>Service Address: ${address}</li>
                    </ul>

                     <button
                        onClick={handleTestClick}
                        className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        test
                    </button>  
                </div>
            )} */}
            <button
                onClick={handleSubmit}
                className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                disabled={!category || !price || !timeSlot || !address}
            >
                Submit Booking
            </button>
        </div>
    );
};


export default QuickBookPage