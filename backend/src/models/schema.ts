import { z } from 'zod';

export const JobStatus = z.enum(['PENDING', 'BOOKED', 'MATCHED', 'COMPLETED', 'CANCELLED']);

export type JobStatus = z.infer<typeof JobStatus>;

export const zDateString = () =>
    z.string()
        .refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date' })
        .transform((val) => new Date(val));

export const JobSchema = z.object({
    serviceType: z.string(),
    status: JobStatus,
    address: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    price: z.number().nullable().optional(),
    budgetMin: z.number().nullable().optional(),
    budgetMax: z.number().nullable().optional(),
    jobStartTime: zDateString().nullable().optional(),
    jobEndTime: zDateString().nullable().optional(),
    lat: z.number().nullable().optional(),
    lng: z.number().nullable().optional(),
});
export type JobDTO = z.infer<typeof JobSchema> & {
    type: 'QUICK_BOOK' | 'POST_QUOTE';
    customerId: string;
};

export const CreateQuickBookSchema = z.object({
    serviceType: z.string(),
    address: z.string(),
    coordinates: z.tuple([z.number(), z.number()]),
    timeRange: z.tuple([z.string(), z.string()]),
    estimatedPrice: z.number(),
});




export const CreatePostQuoteSchema = z.object({
    serviceType: z.string(),
    description: z.string(),
    address: z.string(),
    coordinates: z.tuple([z.number(), z.number()]),
    timeRange: z.tuple([z.string(), z.string()]),
    budgetRange: z.tuple([z.number(), z.number()]),
});