import { makeFetchUserHistoryService } from '@/services/factories/work-entries/make-fetch-user-history-service.js'
import type { Request, Response } from 'express'

export async function history(req: Request, res: Response) {
  const fetchUserHistoryService = makeFetchUserHistoryService()

  const { monthlyHistory } = await fetchUserHistoryService.execute({
    userId: req.user.user_id,
  })

  return res.status(200).json({
    monthlyHistory,
  })
}
