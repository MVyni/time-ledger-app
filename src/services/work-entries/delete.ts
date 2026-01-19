import type { WorkEntriesRepository } from '@/repositories/work-entries-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface DeleteWorkEntriesServiceRequest {
  workEntryId: string
  userId: string
}

export class DeleteWorkEntriesService {
  constructor(private workEntriesRepository: WorkEntriesRepository) {}

  async execute({
    workEntryId,
    userId,
  }: DeleteWorkEntriesServiceRequest): Promise<void> {
    const workEntryExist =
      await this.workEntriesRepository.findById(workEntryId)

    if (!workEntryExist) {
      throw new ResourceNotFoundError()
    }

    if (workEntryExist.user_id !== userId) {
      throw new ResourceNotFoundError()
    }

    await this.workEntriesRepository.delete(workEntryId)
  }
}
