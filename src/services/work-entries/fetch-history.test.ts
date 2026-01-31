import { beforeEach, describe, expect, it } from 'vitest'

import { FetchUserHistoryService } from './fetch-history.js'
import { InMemoryWorkEntriesRepository } from '@/repositories/in-memory/in-memory-work-entries-repository.js'

describe('Fetch User History Service (unit)', () => {
  let workEntriesRepository: InMemoryWorkEntriesRepository
  let sut: FetchUserHistoryService

  beforeEach(() => {
    workEntriesRepository = new InMemoryWorkEntriesRepository()
    sut = new FetchUserHistoryService(workEntriesRepository)
  })

  it('Should be able to fetch monthly history', async () => {
    // January 2026 - 2 entries
    await workEntriesRepository.create({
      user_id: 'user-01',
      date: new Date(2026, 0, 10), // Jan 10, 2026
      duration_minutes: 60, // 1 hour
      hourly_rate_at_time: 10, // 10 per hour
    })

    await workEntriesRepository.create({
      user_id: 'user-01',
      date: new Date(2026, 0, 15), // Jan 15, 2026
      duration_minutes: 120, // 2 hours
      hourly_rate_at_time: 9, // 9 per hour
    })

    // February 2026 - 1 entry
    await workEntriesRepository.create({
      user_id: 'user-01',
      date: new Date(2026, 1, 5), // Feb 05, 2026
      duration_minutes: 30, // 0.5 hours
      hourly_rate_at_time: 10, // 10 per hour
    })

    // Another user - Should be ignored
    await workEntriesRepository.create({
      user_id: 'user-02',
      date: new Date(2026, 0, 10),
      duration_minutes: 60,
      hourly_rate_at_time: 11,
    })

    const { monthlyHistory } = await sut.execute({
      userId: 'user-01',
    })

    expect(monthlyHistory).toHaveLength(2)

    // Expected for January (Month 1):
    // Total Minutes: 60 + 120 = 180
    // Total Earnings: (1 * 10) + (2 * 9) = 10 + 18 = 28
    expect(monthlyHistory).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          month: 1,
          year: 2026,
          totalMinutes: 180,
          totalEarnings: 28,
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

  it('Should return empty list for user with no history', async () => {
    const { monthlyHistory } = await sut.execute({
      userId: 'user-empty',
    })

    expect(monthlyHistory).toHaveLength(0)
    expect(monthlyHistory).toEqual([])
  })
})
