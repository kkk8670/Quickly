'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCoordfromAddr } from '@/utils/commonFunc'
import { SERVICE_CATEGORIES, TimePreference } from '@/lib/constants'
import type { TimeExpection } from '@/types'
import { Range } from 'react-range';

interface PostQuoteFormData {
    serviceType: string;
    description: string;
    address: string;
    coordinates: [
        number,
        number
    ];
    timeOption: TimeExpection;
    budgetRange: [
        number,
        number
    ];
}

const BUDGET_SETTING = {
    MIN: 0,
    MAX: 1000,
    STEP: 1
}

export default function PostQuotePage() {
    const router = useRouter();
    const [formData, setFormData] = useState<PostQuoteFormData>({
        serviceType: '',
        description: '',
        address: '',
        coordinates: [0, 0],
        timeOption: 'flexible',
        budgetRange: [10, 100],
    });

    const handleChange = (field: keyof PostQuoteFormData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const coords = await getCoordfromAddr(formData.address);
        const payload = {
            ...formData,
            coordinates: coords,
        };

        const query = new URLSearchParams({
            serviceType: payload.serviceType,
            description: payload.description,
            address: payload.address,
            timeOption: payload.timeOption,
            budgetRange: payload.budgetRange.join(','),
            coordinates: payload.coordinates.join(','),
        }).toString();

        router.push(`/post-quote/confirm?${query}`);
    };

    const handleTestClick = () => {
        router.push('/post-quote/waiting');
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-8 max-w-xl mx-auto">
            <header className="flex flex-col items-start space-x-4 gap-5">
                <button onClick={() => history.back()} className="text-gray-600">&larr; back</button>
                <h1 className="text-xl font-bold">Post service requirements - Get multiple quotes</h1>
            </header>

            {/* Service Type */}
            <section className="border p-4 rounded shadow space-y-2">
                <label className="block font-semibold">Service Type </label>
                <select
                    className="border p-2 rounded w-full"
                    value={formData.serviceType}
                    onChange={(e) => handleChange('serviceType', e.target.value)}
                >
                    <option value="">Please Choose</option>
                    {SERVICE_CATEGORIES.map(({ key, label }) => (
                        <option key={key} value={key}>{label}</option>
                    ))}
                </select>
            </section>

            {/* describe */}
            <section className="border p-4 rounded shadow space-y-2">
                <label className="block font-semibold">Describe Services</label>
                <textarea
                    className="w-full border p-2 rounded"
                    rows={4}
                    placeholder="Please describe services, square footage, special requirements, etc..."
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                />
            </section>

            {/* address */}
            <section className="border p-4 rounded shadow space-y-2">
                <label className="block font-semibold">Service Address</label>
                <input
                    className="w-full border p-2 rounded"
                    placeholder="Please enter the detailed address"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                />
                <div className="text-sm text-blue-600">[for map position]</div>
            </section>

            {/* Time preference */}
            <section className="border p-4 rounded shadow space-y-2">
                <label className="block font-semibold">Expected service time </label>
                <div className="space-y-2">
                    {TimePreference.map((option, key) => (
                        <label key={key} className="flex items-center space-x-2 cursor-pointer gap-2">
                            <input
                                type="radio"
                                name="timePreference"
                                value={option.key}
                                checked={formData.timeOption === option.key}
                                onChange={() => handleChange('timeOption', option.key)}
                                className="accent-blue-500 "
                            />
                            <span>{option.label}</span>
                        </label>
                    ))}
                </div>
            </section>

            {/* Budget settings */}
            <section className="border p-4 rounded shadow space-y-2">
                <label className="block font-semibold">Budget settings</label>
                <Range
                    step={BUDGET_SETTING.STEP}
                    min={BUDGET_SETTING.MIN}
                    max={BUDGET_SETTING.MAX}
                    values={[formData.budgetRange[0], formData.budgetRange[1]]}
                    onChange={([min, max]) =>
                        handleChange('budgetRange', [min, max])
                    }
                    renderTrack={({ props, children }) => {
                        const [minVal, maxVal] = formData.budgetRange;
                        const percentage = ((maxVal - BUDGET_SETTING.MIN) / (BUDGET_SETTING.MAX - BUDGET_SETTING.MIN)) * 100;
                        return (
                            <div
                                {...props}
                                className="h-2 w-full rounded bg-gray-200"
                                style={{ position: 'relative' }}
                            >
                                <div
                                    className="absolute h-full bg-blue-400 rounded"
                                    style={{
                                        left: `${((minVal - BUDGET_SETTING.MIN) / (BUDGET_SETTING.MAX - BUDGET_SETTING.MIN)) * 100}%`,
                                        width: `${((maxVal - minVal) /
                                            (BUDGET_SETTING.MAX - BUDGET_SETTING.MIN)) *
                                            100
                                            }%`,
                                    }}
                                />
                                {children}
                            </div>
                        );
                    }}
                    renderThumb={({ props }) => (
                        <div
                            {...props}
                            className="w-4 h-4 bg-blue-500 rounded-full shadow border border-white"
                        />
                    )}
                />

                <div className="text-sm text-gray-700">
                    budget: ${formData.budgetRange[0]} - ${formData.budgetRange[1]}
                </div>

                <p className="text-sm text-gray-500">
                    If a service provider quotes a price that does not exceed this range, the system will automatically select it for you.
                </p>
            </section>
            <button
                type="submit"
                className="w-full mt-4 bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
            >
                Post a Request - Start Receiving Quotes
            </button>

        </form>
    );
}
