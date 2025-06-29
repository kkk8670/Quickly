interface JobDetailsCardProps {
    service: string;
    address: string;
    price: number;
    etaHours?: number;
    timeRange?: string;
}

const getEstimatedCompletion = (etaHours: number) => {
    const now = new Date();
    now.setHours(now.getHours() + etaHours);
    return now.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' });
};

const JobDetailsCard = ({ service, address, price, etaHours, timeRange }: JobDetailsCardProps) => {
    return (
        <section className="bg-gray-50 shadow rounded p-4 space-y-2 text-sm">
            <h2 className="font-semibold text-gray-800 mb-2">📄 Service Details</h2>
            {service && (
                <p><span className="font-semibold">Description: </span>{service}</p>
            )}
            {address && (
                <p><span className="font-semibold">Address: </span>{address}</p>
            )}
            {price !== undefined && (
                <p><span className="font-semibold">Agreed Price: </span>${price}</p>
            )}
            {etaHours !== undefined && (
                <p><span className="font-semibold">Estimated Completion: </span>{getEstimatedCompletion(etaHours)}</p>
            )}
            {timeRange !== undefined && (
                <p><span className="font-semibold">Service Time: </span>{timeRange}</p>
            )}
        </section>
    );
};

export default JobDetailsCard;