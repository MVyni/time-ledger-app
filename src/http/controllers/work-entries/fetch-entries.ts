import { makeFetchUserEntriesService } from '@/services/factories/work-entries/make-fetch-user-entries-service.js'

import type { Request, Response } from 'express'

export async function list(req: Request, res: Response) {
    const fetchUserEntriesService = makeFetchUserEntriesService()

    const { entries } = await fetchUserEntriesService.execute({
      userId: req.user.user_id,
    })

    return res.status(200).send({ entries })
}
