import type { Prisma } from '@/generated/prisma/client.js'
import type { WorkEntriesRepository } from '../work-entries-repository.js'
import { prisma } from '@/lib/prisma.js'

export class PrismaWorkEntriesRepository implements WorkEntriesRepository {

    async create(data: Prisma.WorkEntrieUncheckedCreateInput) {
        const work_entrie = await prisma.workEntrie.create({
            data,
        })

        return work_entrie
    }
}