import { PrismaWorkEntriesRepository } from '@/repositories/prisma/prisma-work-entries.repository.js'
import { UpdateWorkEntriesService } from '@/services/work-entries/update.js'

export function makeUpdateWorkEntrieService() {
  const workEntriesRepository = new PrismaWorkEntriesRepository()
  const service = new UpdateWorkEntriesService(workEntriesRepository)

  return service
}