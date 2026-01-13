import type { Prisma, WorkEntrie } from "@/generated/prisma/client.js"


export interface WorkEntriesRepository {
    create(data: Prisma.WorkEntrieUncheckedCreateInput): Promise<WorkEntrie>
    findByUserIdOnDate(userId: string, date: Date): Promise<WorkEntrie | null>
}