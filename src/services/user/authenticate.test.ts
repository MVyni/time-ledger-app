import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { AuthenticateService } from './authenticate.js'

import { InvalidCredentialsError } from '../errors/invalid-credentials-error.js'

import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'

describe('Authenticate Service (unit)', async () => {
  let usersRepository: InMemoryUsersRepository
  let sut: AuthenticateService

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateService(usersRepository)
  })

  it('Should be able to authenticate user', async () => {
    await usersRepository.create({
      name: 'Marcus Vynicius',
      email: 'marcusvynicius@test.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'marcusvynicius@test.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should not be able to authenticate with wrong e-mail', async () => {
    await expect(() =>
      sut.execute({
        email: 'marcusvynicius@test.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'Marcus Vynicius',
      email: 'marcusvynicius@test.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'marcusvynicius@test.com',
        password: '1234566512',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
