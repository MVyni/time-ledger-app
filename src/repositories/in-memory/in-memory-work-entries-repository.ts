import { Prisma, type WorkEntrie } from '@/generated/prisma/client.js'
import type { WorkEntriesRepository } from '../work-entries-repository.js'

import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error.js'

export class InMemoryWorkEntriesRepository implements WorkEntriesRepository {
  public items: WorkEntrie[] = []

  async create(
    data: Prisma.WorkEntrieUncheckedCreateInput
  ): Promise<WorkEntrie> {
    const workEntrie: WorkEntrie = {
      id: data.id ?? randomUUID(),
      user_id: data.user_id,
      date: new Date(data.date),
      duration_minutes: data.duration_minutes,
      hourly_rate_at_time: new Prisma.Decimal(
        data.hourly_rate_at_time as string | number
      ),
    }
    this.items.push(workEntrie)

    return workEntrie
  }

  async update(
    id: string,
    data: Prisma.WorkEntrieUncheckedUpdateInput
  ): Promise<WorkEntrie> {
    const index = this.items.findIndex((item) => item.id === id)

    if (index === -1) {
      throw new ResourceNotFoundError()
    }

    const workEntry = this.items[index]! // "!" ensures that the value exists

    this.items[index] = {
      id: workEntry.id,
      user_id: workEntry.user_id,
      date: data.date ? new Date(data.date as Date) : workEntry.date,
      duration_minutes: data.duration_minutes
        ? Number(data.duration_minutes)
        : workEntry.duration_minutes,
      hourly_rate_at_time: data.hourly_rate_at_time
        ? new Prisma.Decimal(data.hourly_rate_at_time as number)
        : workEntry.hourly_rate_at_time,
    }

    return this.items[index]
  }

  async findById(id: string): Promise<WorkEntrie | null> {
    const workEntry = this.items.find((item) => item.id === id)

    if (!workEntry) {
      return null
    }

    return workEntry
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date
  ): Promise<WorkEntrie | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const workEntrieOnSameDate = this.items.find((workEntrie) => {
      const workEntrieDate = dayjs(workEntrie.date)

      const isOnSameDate =
        workEntrieDate.isAfter(startOfTheDay) &&
        workEntrieDate.isBefore(endOfTheDay)

      return workEntrie.user_id === userId && isOnSameDate
    })

    if (!workEntrieOnSameDate) {
      return null
    }

    return workEntrieOnSameDate
  }
}
