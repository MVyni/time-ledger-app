import { PrismaWorkEntriesRepository } from '@/repositories/prisma/prisma-work-entries.repository.js'
import { FetchUserHistoryService } from '@/services/work-entries/fetch-history.js'

export function makeFetchUserHistoryService() {
  const workEntriesRepository = new PrismaWorkEntriesRepository()
  const service = new FetchUserHistoryService(workEntriesRepository)

  return service
}
