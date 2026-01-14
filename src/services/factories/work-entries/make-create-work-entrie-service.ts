import { PrismaWorkEntriesRepository } from '@/repositories/prisma/prisma-work-entries.repository.js'
import { CreateWorkEntrieService } from '@/services/work-entries/create.js'

export function makeCreateWorkEntrieService() {
  const workEntriesRepository = new PrismaWorkEntriesRepository()
  const useCase = new CreateWorkEntrieService(workEntriesRepository)

  return useCase
}