import { PrismaWorkEntriesRepository } from '@/repositories/prisma/prisma-work-entries.repository.js'
import { FetchUserEntriesService } from '@/services/work-entries/fetch-entries.js'


export function makeFetchUserEntriesService() {
  const workEntriesRepository = new PrismaWorkEntriesRepository()
  const service = new FetchUserEntriesService(workEntriesRepository)

  return service
}
