import { PrismaWorkEntriesRepository } from '@/repositories/prisma/prisma-work-entries.repository.js'
import { DeleteWorkEntriesService } from '@/services/work-entries/delete.js'

export function makeDeleteWorkEntrieService() {
  const workEntriesRepository = new PrismaWorkEntriesRepository()
  const useCase = new DeleteWorkEntriesService(workEntriesRepository)

  return useCase
}