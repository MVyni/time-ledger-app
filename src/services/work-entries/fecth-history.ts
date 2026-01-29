import type { WorkEntrie } from '@/generated/prisma/client.js'
import type { WorkEntriesRepository } from '@/repositories/work-entries-repository.js'

interface FetchUserHistoryServiceRequest {
    userId: string
}

interface FetchUserHistoryServiceResponse {
    workEntries: WorkEntrie[]
}

export class FetchUserHistoryService {
    constructor(private workEntriesRepository: WorkEntriesRepository) { }

    async execute({ userId }: FetchUserHistoryServiceRequest): Promise<FetchUserHistoryServiceResponse> {

        const workEntries = await this.workEntriesRepository.findManyByUser(userId)

        
    }
}