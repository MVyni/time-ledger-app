import { beforeEach, describe, expect, it } from 'vitest'

import { FetchUserHistoryService } from './fetch-history.js'
import { InMemoryWorkEntriesRepository } from '@/repositories/in-memory/in-memory-work-entries-repository.js'

describe('Fetch User History Service (unit)', () => {
  let workEntriesRepository: InMemoryWorkEntriesRepository
  let sut: FetchUserHistoryService

  beforeEach(async () => {
    workEntriesRepository = new InMemoryWorkEntriesRepository()
    sut = new FetchUserHistoryService(workEntriesRepository)

    // January 2026 - 2 entries
    await workEntriesRepository.create({
      user_id: 'user-01',
      date: new Date(2026, 0, 10),
      duration_minutes: 60, // 1 hour
      hourly_rate_at_time: 10,
    })

    await workEntriesRepository.create({
      user_id: 'user-01',
      date: new Date(2026, 0, 15),
      duration_minutes: 120, // 2 hours
      hourly_rate_at_time: 9, 
    })

    // February 2026 - 1 entry
    await workEntriesRepository.create({
      user_id: 'user-01',
      date: new Date(2026, 1, 5),
      duration_minutes: 30, // 0.5 hours
      hourly_rate_at_time: 10,
    })
  })

  it('Should be able to fetch monthly history', async () => {
    const { monthlyHistory } = await sut.execute({
      userId: 'user-01',
    })

    expect(monthlyHistory).toHaveLength(2)
    
    expect(monthlyHistory).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          month: 1,
          year: 2026,
          totalMinutes: 180, // Total Minutes: 60 + 120 = 180
          totalEarnings: 28, // Total Earnings: (1 * 10) + (2 * 9) = 10 + 18 = 28
        }),
        expect.objectContaining({
          month: 2,
          year: 2026,
          totalMinutes: 30,
          totalEarnings: 5, // 0.5 * 10
        }),
      ])
    )
  })

  it('Should not be able fetch a another user monthly history', async () => {
    await workEntriesRepository.create({
      user_id: 'user-02',
      date: new Date(2026, 0, 10),
      duration_minutes: 60,
      hourly_rate_at_time: 11,
    })

    const { monthlyHistory } = await sut.execute({
      userId: 'user-02',
    })

    expect(monthlyHistory).toHaveLength(1)

    expect(monthlyHistory).toEqual([
      expect.objectContaining({
        month: 1,
        year: 2026,
        totalMinutes: 60,
        totalEarnings: 11,
      }),
    ])
  })

  it('Should return empty list for user with no history', async () => {
    const { monthlyHistory } = await sut.execute({
      userId: 'user-empty',
    })

    expect(monthlyHistory).toHaveLength(0)
    expect(monthlyHistory).toEqual([])
  })
})
