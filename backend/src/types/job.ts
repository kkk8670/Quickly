import { JobType } from '@prisma/client'

export type CreateJobDTO = {
    type: JobType
    customerId: string
    title: string
}