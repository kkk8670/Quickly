import { z } from 'zod';

export const CreateJobSchema = z.object({
    serviceType: z.string(),
    address: z.string(),
    jobStartTime: z.string().refine(val => !isNaN(Date.parse(val)), { message: 'Invalid start time' }),
    jobEndTime: z.string().refine(val => !isNaN(Date.parse(val)), { message: 'Invalid end time' }),
    lat: z.number().nullable().optional(),
    lng: z.number().nullable().optional(),
});

export type CreateJobDTO = z.infer<typeof CreateJobSchema> & {
    type: 'QUICK_BOOK' | 'POST_QUOTE';
    customerId: string;
};