import { Socket } from "socket.io";
import { prisma } from '@/lib/prisma.js';
import { JobDTO } from '@/models/schema.js'
import { getConnectedUsers } from "./socketState.js";


type Location = {
    lat?: number | null;
    lng?: number | null;
};

type Provider = {
    id: string;
    name?: string;
    rating?: number;
};

const connectedUsers = getConnectedUsers();

const registerQuickBookHandler = (socket: Socket) => {
    socket.on("register", (userId: string) => {
        connectedUsers.set(userId, socket);
        console.log(`User registered: ${userId}`);
    });

    socket.on("disconnect", () => {
        for (const [userId, s] of connectedUsers.entries()) {
            if (s.id === socket.id) {
                connectedUsers.delete(userId);
                break;
            }
        }
        console.log(`Client disconnected: ${socket.id}`);
    });
};



registerQuickBookHandler.notifyCustomer = (customerId: string, event: string, data: Record<string, any>) => {
    const socket = connectedUsers.get(customerId);
    if (socket) {
        socket.emit(event, data);
    }
};

registerQuickBookHandler.notifyOtherProviders = (jobId: string, selectedProviderId: string, event: string) => {
    for (const [userId, socket] of connectedUsers.entries()) {
        if (userId !== selectedProviderId) {
            socket.emit(event, { jobId, selectedProviderId });
        }
    }
};

const findNearbyProviders = async (location?: Location) => {
    if (!location?.lat || !location?.lng) {
        return await prisma.user.findMany({
            where: {
                type: 'PROVIDER',
                rating: {
                    gte: 4.0,
                },
            },
            select: {
                id: true,
                name: true,
                rating: true,
            },
            orderBy: {
                rating: 'desc',
            },
            take: 10,
        });
    }

    return await prisma.user.findMany({
        where: {
            type: 'PROVIDER',
            locationLat: {
                gte: location.lat - 0.1,
                lte: location.lat + 0.1,
            },
            locationLng: {
                gte: location.lng - 0.1,
                lte: location.lng + 0.1,
            },
        },
        select: {
            id: true,
        },
    });
};


registerQuickBookHandler.broadcastQuickBook = async (job: JobDTO) => {
    const providers = await findNearbyProviders({ lat: job.lat, lng: job.lng });

    const jobData = {
        serviceType: job.serviceType,
        address: job.address,
        price: job.price,
        timeRange: [job.jobStartTime, job.jobEndTime],
        customerId: job.customerId,
    };

    providers.forEach((provider: Provider) => {
        const socket = connectedUsers.get(provider.id);
        if (socket) {
            socket.emit("new_quick_book", jobData);
        }
    });
};


export default registerQuickBookHandler;