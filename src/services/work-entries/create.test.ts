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

        const mockDate = new Date(2026, 0, 12)
        vi.setSystemTime(mockDate)

        const { workEntrie } = await sut.execute({
            userId: 'user-01',
            date: mockDate,
            durationMinutes: 540,
            hourlyRateAtTime: 9.00
        })

        expect(workEntrie.id).toEqual(expect.any(String))
    })

    it('Should not be able to register a work entry twice on the same day', async () => {

        const mockDate = new Date(2026, 0, 12, 1)
        vi.setSystemTime(mockDate)

        await sut.execute({
          userId: 'user-01',
          date: mockDate,
          durationMinutes: 540,
          hourlyRateAtTime: 9.0,
        })

        await expect(() =>
          sut.execute({
            userId: 'user-01',
            date: mockDate,
            durationMinutes: 540,
            hourlyRateAtTime: 9.0,
          })).rejects.toBeInstanceOf(MaxDailyOfWorkEntriesError)
    })
})