export type JobType = 'QUICK_BOOK' | 'POST_QUOTE';

export type JobStatus = 'PENDING' | 'BOOKED' | 'COMPLETED' | 'CANCELLED';

export type Job = {
    id: string;
    type: JobType;
    status: JobStatus;
    title: string | null;
    description: string | null;
    customerId: string;
    createdAt: string;
};

export type Bid = {
    id: string;
    amount: number;
    message: string | null;
    providerId: string;
    jobId: string;
    createdAt: string;
};