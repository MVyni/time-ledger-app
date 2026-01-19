import type { Prisma, WorkEntrie } from '@/generated/prisma/client.js'
import type { WorkEntriesRepository } from '../work-entries-repository.js'
import { prisma } from '@/lib/prisma.js'

import dayjs from 'dayjs'

export class PrismaWorkEntriesRepository implements WorkEntriesRepository {

    async create(data: Prisma.WorkEntrieUncheckedCreateInput) {
        const workEntry = await prisma.workEntrie.create({
            data,
        })

        return workEntry
    }

    async update(id: string, data: Prisma.WorkEntrieUncheckedUpdateInput) {
        const workEntry = await prisma.workEntrie.update({
            where: {
                id,
            },

            data,
        })

        return workEntry
    }

    async delete(id: string) {
        await prisma.workEntrie.delete({
            where: {
                id,
            }
        })
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

    async findById(id: string) {
        const workEntry = await prisma.workEntrie.findUnique({
            where: {
                id,
            }
        })

        return workEntry
    }
}