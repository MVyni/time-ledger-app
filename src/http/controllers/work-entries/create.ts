import { makeCreateWorkEntrieService } from '@/services/factories/work-entries/make-create-work-entrie-service.js'

import type { Request, Response } from 'express'

import z from 'zod'

export async function createWorkEntries(req: Request, res: Response) {
  const createWorkEntrieBodySchema = z.object({
    date: z.coerce.date(),
    durationMinutes: z.number(),
    hourlyRateAtTime: z.number(),
  })

    const { date, durationMinutes, hourlyRateAtTime } = createWorkEntrieBodySchema.parse(req.body)
    
    const createWorkEntrieService = makeCreateWorkEntrieService()
        
        await createWorkEntrieService.execute({
            userId: req.user.user_id,
            date,
            durationMinutes,
            hourlyRateAtTime
        })

    return res.status(201).send({ message: 'Work entry created successfully'})
}
