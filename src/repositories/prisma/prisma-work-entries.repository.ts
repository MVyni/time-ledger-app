import type { Prisma, WorkEntrie } from '@/generated/prisma/client.js'
import type { WorkEntriesRepository } from '../work-entries-repository.js'
import { prisma } from '@/lib/prisma.js'

import dayjs from 'dayjs'

export class PrismaWorkEntriesRepository implements WorkEntriesRepository {

    async create(data: Prisma.WorkEntrieUncheckedCreateInput) {
        const work_entrie = await prisma.workEntrie.create({
            data,
        })

        return work_entrie
    }

    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')

        const workEntrie = await prisma.workEntrie.findFirst({
            where: {
                user_id: userId,
                date: {
                    gte: startOfTheDay.toDate(),
                    lte: endOfTheDay.toDate(),
                }
            }
        })
        
        return workEntrie
    }
}