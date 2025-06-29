
import type { Job } from '@/types'
import {formatTime} from '@/utils/commonFunc'


export const StatusCard = ({ icon, title, children, color }: { icon: string; title: string; children: React.ReactNode; color: string }) => (
    <div className={`bg-${color}-50 border border-${color}-200 rounded-2xl p-6 text-center space-y-2`}>
        <div className="text-4xl">{icon}</div>
        <h3 className="text-lg font-semibold">{title}</h3>
        {children}
    </div>
);

export const JobInfoCard = ({ job }: { job: Job }) => {

 
    const start = formatTime(job.timeRange?.[0]??'')
    const end = formatTime(job.timeRange?.[1]??'')

    return (
        <section className="bg-white rounded-2xl shadow p-6 space-y-3 text-sm">
            <h2 className="text-base font-bold mb-2">📄 Order Details</h2>
            <div className="space-y-1">
                <InfoRow label="Service Type" value={job.serviceType ?? ''} />
                <InfoRow label="Address" value={job.address ?? ''} />
                <InfoRow label="Time Window" value={`${start}-${end}`} />
                <InfoRow label="Price" value={`$${job.price}`} highlight />
            </div>
        </section>
    )
}

export const InfoRow = ({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) => (
    <div className="flex justify-between text-sm">
        <span className="text-gray-600">{label}:</span>
        <span className={highlight ? 'font-semibold text-gray-800' : ''}>{value}</span>
    </div>
);
