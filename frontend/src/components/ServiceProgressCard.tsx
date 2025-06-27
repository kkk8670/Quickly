import { ORDER_STATUS } from '@/lib/constants'

interface Provider {
    eta: number;
}

interface ServiceProgressCardProps {
    provider: Provider;
    status: 'confirmed' | 'on_the_way' | 'started' | 'completed';
}

const getStatusIcon = (stepKey: string, currentStatus: string) => {
    if (ORDER_STATUS.findIndex(s => s.key === stepKey) < ORDER_STATUS.findIndex(s => s.key === currentStatus)) {
        return '✔';
    }
    if (stepKey === currentStatus) {
        return '▶';
    }
    return '';
};

const getStatusColor = (stepKey: string, currentStatus: string) => {
    if (ORDER_STATUS.findIndex(s => s.key === stepKey) < ORDER_STATUS.findIndex(s => s.key === currentStatus)) {
        return 'text-green-600';
    }
    if (stepKey === currentStatus) {
        return 'text-blue-600 font-semibold';
    }
    return 'text-gray-400';
};

const getStatusHint = (status: string, eta: number) => {
    switch (status) {
        case 'confirmed':
            return '✅ Order confirmed. Waiting for provider to depart.';
        case 'on_the_way':
            return `🚗 Provider expected in ${eta} minutes.`;
        case 'started':
            return '🛠️ Service in progress.';
        case 'completed':
            return '🎉 Service completed.';
        default:
            return '';
    }
};

const ServiceProgressCard = ({ provider, status }: ServiceProgressCardProps) => {
    return (
        <section className="bg-white shadow rounded p-4 space-y-3">
            <h2 className="font-semibold text-gray-800 text-base">📦 Service progress</h2>

            <div className="flex justify-between text-sm font-medium">
                {ORDER_STATUS.map((step) => (
                    <span
                        key={step.key}
                        className={getStatusColor(step.key, status)}
                    >
                        {getStatusIcon(step.key, status)} {step.label}
                    </span>
                ))}
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-700">
                <span>{getStatusHint(status, provider.eta)}</span>
            </div>
        </section>
    );
};

export default ServiceProgressCard