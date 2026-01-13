import type { WorkEntrie } from '@/generated/prisma/client.js'
import type { WorkEntriesRepository } from '@/repositories/work-entries-repository.js'

interface WorkEntrieServiceRequest {
  userId: string
  date: Date
  durationMinutes: number
  hourlyRateAtTime: number
}

interface WorkEntrieServiceResponse {
  workEntrie: WorkEntrie
}

export class WorkEntrieService {
  constructor(private workEntriesRepository: WorkEntriesRepository) {}

  async execute({
    userId,
    date,
    durationMinutes,
    hourlyRateAtTime,
  }: WorkEntrieServiceRequest): Promise<WorkEntrieServiceResponse> {

    const workEntrieOnSameDate = await this.workEntriesRepository.findByUserIdOnDate(userId, new Date())

    if (workEntrieOnSameDate) {
      throw new Error()
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
