import { z } from 'zod';

export const CreateBidSchema = z.object({
    jobId: z.string(),
    providerId: z.string(),
    amount: z.number(),
    message: z.string().optional(),
});

export type CreateBidDTO = z.infer<typeof CreateBidSchema>;