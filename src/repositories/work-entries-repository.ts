import type { Prisma, WorkEntrie } from "@/generated/prisma/client.js"


export interface WorkEntriesRepository {
  create(data: Prisma.WorkEntrieUncheckedCreateInput): Promise<WorkEntrie>
  update(id: string, data: Prisma.WorkEntrieUncheckedUpdateInput): Promise<WorkEntrie>
  delete(id: string): Promise<void>
  findByUserIdOnDate(userId: string, date: Date): Promise<WorkEntrie | null>
  findById(id: string): Promise<WorkEntrie | null>
}