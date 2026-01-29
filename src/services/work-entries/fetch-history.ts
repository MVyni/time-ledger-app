import type { MonthlyHistory, WorkEntriesRepository } from '@/repositories/work-entries-repository.js'

interface FetchUserHistoryServiceRequest {
    userId: string
}

interface FetchUserHistoryServiceResponse {
    monthlyHistory: MonthlyHistory[]
}

export class FetchUserHistoryService {
    constructor(private workEntriesRepository: WorkEntriesRepository) { }

    async execute({ userId }: FetchUserHistoryServiceRequest): Promise<FetchUserHistoryServiceResponse> {

        const monthlyHistory = await this.workEntriesRepository.findMonthlyHistory(userId)

        return { monthlyHistory }
    }
}