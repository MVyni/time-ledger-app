import { PrismaWorkEntriesRepository } from '@/repositories/prisma/prisma-work-entries.repository.js'
import { CreateWorkEntriesService } from '@/services/work-entries/create.js'

export function makeCreateWorkEntrieService() {
  const workEntriesRepository = new PrismaWorkEntriesRepository()
  const service = new CreateWorkEntriesService(workEntriesRepository)

  return service
}