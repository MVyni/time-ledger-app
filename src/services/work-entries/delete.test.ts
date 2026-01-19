import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { InMemoryWorkEntriesRepository } from '@/repositories/in-memory/in-memory-work-entries-repository.js'
import { DeleteWorkEntriesService } from './delete.js'

import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

describe('Delete Work Entry Service (unit)', async () => {
  let workEntriesRepository: InMemoryWorkEntriesRepository
  let sut: DeleteWorkEntriesService

  const mockDate = new Date(2026, 0, 12)

  beforeEach(async () => {
    workEntriesRepository = new InMemoryWorkEntriesRepository()
    sut = new DeleteWorkEntriesService(workEntriesRepository)

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

  it('Should be able to delete a work entry', async () => {
    await sut.execute({
      workEntryId: 'work-entry-01',
      userId: 'user-01',
    })

    expect(workEntriesRepository.items).toHaveLength(0)
  })

  it('Should not be possible for a user delete a work entry that is not their own', async () => {
    await expect(() =>
      sut.execute({
        workEntryId: 'work-entry-01',
        userId: 'user-02',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('Should not be able to delete a non-existing work entry', async () => {
    await expect(() =>
      sut.execute({
        workEntryId: 'work-entry-non-existing',
        userId: 'user-01',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
