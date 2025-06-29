import { Provider } from '@/types'

interface ProviderProps {
    provider: Provider
}

const ProviderCard = ({ provider }: ProviderProps) => {
    return (
        <section className="bg-white shadow rounded p-4 space-y-4">
            <h2 className="font-semibold text-gray-800 text-base">🧑‍🔧 Selected Service Providers</h2>
            <div className="flex items-center space-x-4">
                <img
                    src={provider.avatar}
                    alt="avatar"
                    className="w-16 h-16 rounded-full bg-gray-200"
                />
                <div>
                    <p className="font-bold text-gray-800">{provider.name}
                    </p>
                    <p className="text-sm text-gray-600">
                        ⭐ {provider.rating}（{provider.reviewCount} comments ）
                    </p>
                    <p className="text-sm text-gray-500">
                        {provider.completedJobs} orders | {provider.experience}  years of experience
                    </p>
                </div>
            </div>

            <div className="flex space-x-3">
                <a
                    href={`tel:${provider.phone}`}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 rounded"
                >
                    📞 Phone
                </a>
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 py-2 rounded">
                    💬 Message
                </button>
            </div>
        </section>
    )
}

export default ProviderCard