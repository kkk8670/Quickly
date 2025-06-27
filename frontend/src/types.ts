export type JobType = 'QUICK_BOOK' | 'POST_QUOTE';

export type JobStatus = 'PENDING' | 'BOOKED' | 'MATCHED' | 'COMPLETED' | 'CANCELLED';

export type TimeExpection = 'asap' | 'this_week' | 'flexible';

export interface Job {
    id: string;
    type: JobType;
    status: JobStatus;
    serviceType?: string | null;
    price?: string | null;
    providerId?: string | null;
    description?: string | null;
    address?: string | null;
    coord?: [number, number];
    timeRange?: [string, string];
    timeOption?: TimeExpection;
    budgetRange?: [number, number];
    customerId?: string;
    createdAt?: string;
};

export interface JobStore {
    job: Job | null;
    setJob: (job: Job) => void;
    clearJob: () => void;
};

export interface TempJobData {
    [key: string]: any;
}

export interface JobStoreState {
    currentJob: SetJob | null;
    tempJobData: TempJobData;
    jobsCache: Map<string, Job>;
}

export type SetJob = { id: string } & Partial<Omit<Job, 'id'>>;

export interface JobStoreActions {
    setCurrentJob: (job: SetJob | null) => void,
    updateTempJobData: (data: Partial<TempJobData>) => void;
    clearTempJobData: () => void;
    cacheJob: (jobId: string, jobData: Job) => void;
    getCachedJob: (jobId: string) => Job | undefined;
    updateJobStatus: (
        jobId: string,
        status: JobStatus,
        updates?: Partial<Job>
    ) => void;
}

export interface Provider {
    id: string;
    name: string;
    specialty?: string;
    rating: number;
    reviewCount: number;
    avatar: string;
    completedJobs: number;
    phone: string;
    experience: number;
}

export type Bid = {
    id: string;
    price: number;
    message: string | null;
    provider: Provider;
    jobId: string;
    createdAt: string;
};

