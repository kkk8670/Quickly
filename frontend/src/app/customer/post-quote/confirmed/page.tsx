'use client';

import { useParams } from 'next/navigation';
import ServiceProgressCard from '@/components/ServiceProgressCard'
import JobDetailsCard from '@/components/JobDetailsCard'
import { providers, jobs } from '@/mock/testData'
import ProviderCard from '@/components/providerCard'

export default function PostQuoteConfirmedPage() {
    const { jobId } = useParams();

    const selectedBid = {
        price: 100,
        etaHours: 3,
        provider: providers[1]
    };

    const job = jobs[2]

    const getEstimatedCompletion = (hours: number) => {
        const estimated = new Date();
        estimated.setHours(estimated.getHours() + hours);
        return estimated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="p-6 space-y-8 max-w-xl mx-auto">
            <header className="text-center space-y-1">
                <div className="text-green-600 font-semibold text-sm">✅ Service provider confirmed</div>
                <h1 className="text-xl font-bold text-gray-800">Order ID：PQ-{jobId}</h1>
            </header>


            <ProviderCard
                provider={selectedBid.provider}
            />


            <JobDetailsCard
                service={job.category}
                address={job.address}
                price={selectedBid.price}
                etaHours={selectedBid.etaHours}
            />

            <ServiceProgressCard
                provider={selectedBid.provider}
                status={'on_the_way'}
            />

            <section className="flex justify-end gap-4">
                <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">
                    Cancel Order
                </button>
            </section>
        </div>
    );
}
