import { findAllJobs } from './jobs.repository';

export async function getJobs() {
    return findAllJobs();
}