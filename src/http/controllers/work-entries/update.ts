import type { Request, Response } from 'express'

import { makeUpdateWorkEntrieService } from '@/services/factories/work-entries/make-update-work-entries-service.js'

import z from 'zod'

export async function updateWorkEntries(req: Request, res: Response) {
  const updateWorkEntryBodySchema = z.object({
    date: z.coerce.date(),
    durationMinutes: z.number(),
    hourlyRateAtTime: z.number(),
  })

  const updateWorkEntryParamsSchema = z.object({ workEntryId: z.string() })

  const { date, durationMinutes, hourlyRateAtTime } =
    updateWorkEntryBodySchema.parse(req.body)
  const { workEntryId } = updateWorkEntryParamsSchema.parse(req.params)

  const updateWorkEntrieService = makeUpdateWorkEntrieService()

  const { workEntrie } = await updateWorkEntrieService.execute({
    workEntryId,
    userId: req.user.user_id,
    date,
    durationMinutes,
    hourlyRateAtTime,
  })

  return res.status(200).send({ workEntrie })
}
