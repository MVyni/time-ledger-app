import type { WorkEntrie } from '@/generated/prisma/client.js'
import type { WorkEntriesRepository } from '@/repositories/work-entries-repository.js'

import { MaxDailyOfWorkEntriesError } from '../errors/max-daily-of-work-entrie-error.js'

interface WorkEntriesServiceRequest {
  userId: string
  date: Date
  durationMinutes: number
  hourlyRateAtTime: number
}

interface WorkEntriesServiceResponse {
  workEntrie: WorkEntrie
}

export class CreateWorkEntriesService {
  constructor(private workEntriesRepository: WorkEntriesRepository) {}

  async execute({
    userId,
    date,
    durationMinutes,
    hourlyRateAtTime,
  }: WorkEntriesServiceRequest): Promise<WorkEntriesServiceResponse> {

    const workEntrieOnSameDate = await this.workEntriesRepository.findByUserIdOnDate(userId, date)

    if (workEntrieOnSameDate) {
      throw new MaxDailyOfWorkEntriesError()
    }

    const workEntrie = await this.workEntriesRepository.create({
      user_id: userId,
      date,
      duration_minutes: durationMinutes,
      hourly_rate_at_time: hourlyRateAtTime,
    })

    return { workEntrie }
  }
}
