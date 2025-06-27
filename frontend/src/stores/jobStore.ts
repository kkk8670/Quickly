// src/store/jobStore.ts
import { create } from 'zustand';
import type { Job, SetJob, JobStoreState, JobStoreActions } from '@/types'



const useJobStore = create<JobStoreState & JobStoreActions>((set, get) => ({

    currentJob: null,

    tempJobData: {},

    jobsCache: new Map(),

    setCurrentJob: (job) => set({ currentJob: job }),

    updateTempJobData: (data) => set(state => ({
        tempJobData: { ...state.tempJobData, ...data }
    })),

    clearTempJobData: () => set({ tempJobData: {} }),

    cacheJob: (jobId, jobData) => set(state => {
        const newCache = new Map(state.jobsCache);
        newCache.set(jobId, jobData);
        return { jobsCache: newCache };
    }),

    getCachedJob: (jobId) => {
        return get().jobsCache.get(jobId);
    },

    updateJobStatus: (jobId, status, updates?: Partial<Job>) => set(state => {
        const newCache = new Map(state.jobsCache);
        const existingJob = newCache.get(jobId);
        if (existingJob) {
            newCache.set(jobId, { ...existingJob, status, ...updates });
        }

        return {
            jobsCache: newCache,
            currentJob: state.currentJob?.id === jobId
                ? { ...state.currentJob, status, ...updates }
                : state.currentJob
        };
    })
}));

export default useJobStore;