import type { WorkEntrie } from '@/generated/prisma/client.js'
import type { WorkEntriesRepository } from '@/repositories/work-entries-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'
import { MaxDailyOfWorkEntriesError } from '../errors/max-daily-of-work-entrie-error.js'

interface updateWorkEntriesServiceRequest {
  workEntryId: string
  userId: string
  date: Date
  durationMinutes: number
  hourlyRateAtTime: number
}

interface updateWorkEntriesServiceResponse {
  workEntrie: WorkEntrie
}

export class updateWorkEntriesService {
  constructor(private workEntriesRepository: WorkEntriesRepository) {}

  async execute({
    workEntryId,
    userId,
    date,
    durationMinutes,
    hourlyRateAtTime,
  }: updateWorkEntriesServiceRequest): Promise<updateWorkEntriesServiceResponse> {
    const workEntryExist =
      await this.workEntriesRepository.findById(workEntryId)

    if (!workEntryExist) {
      throw new ResourceNotFoundError()
    }

    if (workEntryExist.user_id !== userId) {
      throw new ResourceNotFoundError()
    }

    const workEntrieOnSameDate =
      await this.workEntriesRepository.findByUserIdOnDate(userId, date)

    if (workEntrieOnSameDate && workEntrieOnSameDate.id !== workEntryId) {
      throw new MaxDailyOfWorkEntriesError()
    }

    const workEntrie = await this.workEntriesRepository.update(workEntryId, {
      date,
      duration_minutes: durationMinutes,
      hourly_rate_at_time: hourlyRateAtTime,
    })

    return { workEntrie }
  }
}
