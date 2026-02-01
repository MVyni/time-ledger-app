import { Prisma, type WorkEntrie } from '@/generated/prisma/client.js'
import type {
  MonthlyHistory,
  WorkEntriesRepository,
} from '../work-entries-repository.js'

import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error.js'

export class InMemoryWorkEntriesRepository implements WorkEntriesRepository {
  public items: WorkEntrie[] = []

  async create(data: Prisma.WorkEntrieUncheckedCreateInput) {
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

  async update(id: string, data: Prisma.WorkEntrieUncheckedUpdateInput) {
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

  async delete(id: string) {
    const index = this.items.findIndex((item) => item.id === id)

    if (index > -1) {
      this.items.splice(index, 1)
    }
  }

  async findById(id: string) {
    const workEntry = this.items.find((item) => item.id === id)

    if (!workEntry) {
      return null
    }

    return workEntry
  }

  async findByUserIdOnDate(userId: string, date: Date) {
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

  async findMonthlyHistory(userId: string) {
    const userEntries = this.items.filter((item) => item.user_id === userId)

    const grouped = userEntries.reduce(
      (acc, entry) => {
        const date = dayjs(entry.date)
        const key = `${date.year()}-${date.month() + 1}`

        if (!acc[key]) {
          acc[key] = {
            month: date.month() + 1,
            year: date.year(),
            totalMinutes: 0,
            totalEarnings: 0,
          }
        }

        acc[key].totalMinutes += entry.duration_minutes

        const hours = entry.duration_minutes / 60
        const earnings = hours * Number(entry.hourly_rate_at_time)

        acc[key].totalEarnings += earnings

        return acc
      },
      {} as Record<string, MonthlyHistory>
    )

    const history = Object.values(grouped).sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year
      return b.month - a.month
    })

    // Simulate database rounding.
    return history.map((h) => ({
      ...h,
      totalEarnings: Number(h.totalEarnings.toFixed(2)),
    }))
  }

  async findManyEntriesByUser(userId: string) {
    const entries = this.items.filter((item) => item.user_id === userId)

    return entries.sort((a, b) => {
      return a.date.getTime() - b.date.getTime()
    })
  }
}
