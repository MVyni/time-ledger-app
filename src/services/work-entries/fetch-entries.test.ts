import { beforeEach, describe, expect, it } from 'vitest'

import { FetchUserEntriesService } from './fetch-entries.js'
import { InMemoryWorkEntriesRepository } from '@/repositories/in-memory/in-memory-work-entries-repository.js'

describe('Fetch User Entries Service (unit)', () => {
  let workEntriesRepository: InMemoryWorkEntriesRepository
  let sut: FetchUserEntriesService

  beforeEach(async () => {
    workEntriesRepository = new InMemoryWorkEntriesRepository()
    sut = new FetchUserEntriesService(workEntriesRepository)

    // Setup: Create entries
    await workEntriesRepository.create({
      user_id: 'user-01',
      date: new Date(2026, 0, 10),
      duration_minutes: 60,
      hourly_rate_at_time: 10,
    })

    await workEntriesRepository.create({
      user_id: 'user-01',
      date: new Date(2026, 0, 12),
      duration_minutes: 120,
      hourly_rate_at_time: 11,
    })
  })

  it('Should be able to fetch user entries list', async () => {
    // Execution
    const { entries } = await sut.execute({
      userId: 'user-01',
    })

    expect(entries).toHaveLength(2)

    // Assertion: Should be ordered by date ASC (older first)
    // Jan 10 first, Jan 12 second
    expect(entries).toEqual([
        expect.objectContaining({ date: new Date(2026, 0, 10) }),
        expect.objectContaining({ date: new Date(2026, 0, 12) }),
    ])
  })
    
    it('Should not be able fetch a another user entries list', async () => {
      await workEntriesRepository.create({
        user_id: 'user-02',
        date: new Date(2026, 0, 28),
        duration_minutes: 60,
        hourly_rate_at_time: 10,
      })
        
       const { entries } = await sut.execute({
         userId: 'user-02',
       }) 
        
        expect(entries).toHaveLength(1)
        expect(entries).toEqual([
        expect.objectContaining({ date: new Date(2026, 0, 28) }),
    ])
  })

  it('Should return empty list for user with no entries', async () => {
    // Execution with new user
    const { entries } = await sut.execute({
      userId: 'user-empty',
    })

    // Assertion
    expect(entries).toHaveLength(0)
    expect(entries).toEqual([])
  })
})
