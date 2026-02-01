import type { WorkEntrie } from '@/generated/prisma/client.js'
import type {  WorkEntriesRepository } from '@/repositories/work-entries-repository.js'

interface FetchUserEntriesServiceRequest {
    userId: string
}

type SafeEntry = Omit<
  WorkEntrie,
  'id' | 'user_id'
>

interface FetchUserEntriesServiceResponse {
  entries: SafeEntry[]
}

export class FetchUserEntriesService {
    constructor(private workEntriesRepository: WorkEntriesRepository) { }

    async execute({ userId }: FetchUserEntriesServiceRequest): Promise<FetchUserEntriesServiceResponse> {

        const entries = await this.workEntriesRepository.findManyEntriesByUser(userId)

        const safeEntry = entries.map(entry => ({
            date: entry.date,
            duration_minutes: entry.duration_minutes,
            hourly_rate_at_time: entry.hourly_rate_at_time    
        }))

        return { entries: safeEntry }
    }
}