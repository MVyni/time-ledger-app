import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Decimal } from '@prisma/client/runtime/client'

import { InMemoryWorkEntriesRepository } from '@/repositories/in-memory/in-memory-work-entries-repository.js'
import { updateWorkEntriesService } from './update.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

describe('Update Work Entry Service (unit)', async () => {
  let workEntriesRepository: InMemoryWorkEntriesRepository
  let sut: updateWorkEntriesService

    const mockDate = new Date(2026, 0, 12)
    
  beforeEach(async () => {
    workEntriesRepository = new InMemoryWorkEntriesRepository()
      sut = new updateWorkEntriesService(workEntriesRepository)
      
      vi.setSystemTime(mockDate)

      await workEntriesRepository.create({
        id: 'work-entry-01',
        user_id: 'user-01',
        date: mockDate,
        duration_minutes: 540,
        hourly_rate_at_time: 9.0,
      })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should be able to update a work entry', async () => {

    const { workEntrie } = await sut.execute({
      workEntryId: 'work-entry-01',
      userId: 'user-01',
      date: mockDate,
      durationMinutes: 549,
      hourlyRateAtTime: 10.0,
    })

    expect(workEntrie.user_id).toEqual('user-01')
    expect(workEntrie.duration_minutes).toEqual(549)
    expect(workEntrie.hourly_rate_at_time).toEqual(Decimal(10.0))
  })
    
    it('Should not be possible for a user edit a work entry that is not their own', async () => {

        await expect(() => sut.execute({
            workEntryId: 'work-entry-01',
            userId: 'user-02',
            date: mockDate,
            durationMinutes: 550,
            hourlyRateAtTime: 10.0
        })).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})
