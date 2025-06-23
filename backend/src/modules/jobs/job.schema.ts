import { z } from 'zod';

export const CreateJobSchema = z.object({
    type: z.enum(['QUICK_BOOK', 'POST_QUOTE']),
    customerId: z.string(),
    title: z.string(),
    description: z.string().optional(),
    lat: z.number().nullable().optional(),
    lng: z.number().nullable().optional(),
});

export type CreateJobDTO = z.infer<typeof CreateJobSchema>;