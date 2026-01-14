import { MaxDailyOfWorkEntrieError } from '@/services/errors/max-daily-of-work-entrie-error.js'
import { makeCreateWorkEntrieService } from '@/services/factories/work-entries/make-create-work-entrie-service.js'

import type { Request, Response } from 'express'

import z from 'zod'

export async function createWorkEntrie(req: Request, res: Response) {
  const createWorkEntrieBodySchema = z.object({
    date: z.coerce.date(),
    durationMinutes: z.number(),
    hourlyRateAtTime: z.number(),
  })

    const { date, durationMinutes, hourlyRateAtTime } = createWorkEntrieBodySchema.parse(req.body)
    
    const createWorkEntrieService = makeCreateWorkEntrieService()
    try {
        
        await createWorkEntrieService.execute({
            userId: req.user.user_id,
            date,
            durationMinutes,
            hourlyRateAtTime
        })

    } catch (error) {
        if (error instanceof MaxDailyOfWorkEntrieError) {
            return res.status(409).send({ message: error.message })
        }
    }

    return res.status(201).send({ createWorkEntrieService })
}
