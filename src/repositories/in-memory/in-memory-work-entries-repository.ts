import type { Prisma, WorkEntrie } from '@/generated/prisma/client.js'
import type { WorkEntriesRepository } from '../work-entries-repository.js'

import { randomUUID } from 'node:crypto'
import { Decimal } from '@prisma/client/runtime/client'
import dayjs from 'dayjs'

export class InMemoryWorkEntriesRepository implements WorkEntriesRepository {
    
    public items: WorkEntrie[] = []
        
        async create(data: Prisma.WorkEntrieUncheckedCreateInput): Promise<WorkEntrie> {
        const workEntrie: WorkEntrie = {
            id: randomUUID(),
            user_id: data.user_id,
            date: new Date(data.date),
            duration_minutes: data.duration_minutes,
            hourly_rate_at_time: new Decimal(data.hourly_rate_at_time as string | number)
        }
        this.items.push(workEntrie)
        
        return workEntrie
    }

    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')

        const workEntrieOnSameDate = this.items.find((workEntrie) => {

            const workEntrieDate = dayjs(workEntrie.date)

            const isOnSameDate = workEntrieDate.isAfter(startOfTheDay) && workEntrieDate.isBefore(endOfTheDay)

            return workEntrie.user_id === userId && isOnSameDate
        })

        if (!workEntrieOnSameDate) {
            return null
        }

        return workEntrieOnSameDate
    }
}