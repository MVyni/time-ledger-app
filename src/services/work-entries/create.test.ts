import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { CreateWorkEntriesService } from './create.js'
import { InMemoryWorkEntriesRepository } from '@/repositories/in-memory/in-memory-work-entries-repository.js'

import { MaxDailyOfWorkEntriesError } from '../errors/max-daily-of-work-entrie-error.js'

describe('Create Work Entry Service (unit)', async () => {
  let workEntriesRepository: InMemoryWorkEntriesRepository
  let sut: CreateWorkEntriesService

  beforeEach(() => {
    workEntriesRepository = new InMemoryWorkEntriesRepository()
    sut = new CreateWorkEntriesService(workEntriesRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should be able to register a work entry', async () => {
    // Setup scenarios: Mocking the current date to January 12, 2026
    const mockDate = new Date(2026, 0, 12)
    vi.setSystemTime(mockDate)

    // Execution: calling the service to create a new work entry
    const { workEntrie } = await sut.execute({
      userId: 'user-01',
      date: mockDate,
      durationMinutes: 540,
      hourlyRateAtTime: 9.0,
    })

    // Assertion: verifying if the work entry was created successfully with an ID
    expect(workEntrie.id).toEqual(expect.any(String))
  })

  it('Should not be able to register a work entry twice on the same day', async () => {
    // Setup scenarios: Creating an initial entry
    const mockDate = new Date(2026, 0, 12, 1) // Jan 12, 2026
    vi.setSystemTime(mockDate)

    await sut.execute({
      userId: 'user-01',
      date: mockDate,
      durationMinutes: 540,
      hourlyRateAtTime: 9.0,
    })

    // Assertion: Trying to create another entry on the same day should fail
    await expect(() =>
      sut.execute({
        userId: 'user-01',
        date: mockDate,
        durationMinutes: 540,
        hourlyRateAtTime: 9.0,
      })
    ).rejects.toBeInstanceOf(MaxDailyOfWorkEntriesError)
  })
})
