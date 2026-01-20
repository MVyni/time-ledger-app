import type { Request, Response } from 'express'

import { makeDeleteWorkEntrieService } from '@/services/factories/work-entries/make-delete-work-entries-service.js'


import z from 'zod'

export async function deleteWorkEntries(req: Request, res: Response) {

  const deleteWorkEntryParamsSchema = z.object({ workEntryId: z.string() })

  const { workEntryId } = deleteWorkEntryParamsSchema.parse(req.params)

  const deleteWorkEntrieService = makeDeleteWorkEntrieService()

    await deleteWorkEntrieService.execute({
    workEntryId,
    userId: req.user.user_id,
  })

  return res.status(204).send()
}
