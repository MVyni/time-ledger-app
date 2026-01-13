import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { RegisterUserService } from './register.js'
import { UserAlreadyExistError } from '../errors/user-already-exist-error.js'

import { compare } from 'bcryptjs'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUserService

describe('Register Service', async () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUserService(usersRepository)
  })

  it('Should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Marcus Vynicius',
      email: 'marcusvynicius@test.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Marcus Vynicius',
      email: 'marcusvynicius@test.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('Should not be able to register with same email twice', async () => {
    await sut.execute({
      name: 'Marcus Vynicius',
      email: 'marcusvynicius@test.com',
      password: '123456',
    })

    await expect(
      sut.execute({
        name: 'Marcus Vynicius',
        email: 'marcusvynicius@test.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistError)
  })
})
