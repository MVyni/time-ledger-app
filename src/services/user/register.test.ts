import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { RegisterUserService } from './register.js'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error.js'

import { compare } from 'bcryptjs'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUserService

describe('Register Service', async () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUserService(usersRepository)
  })

  it('Should be able to register', async () => {
    // Execution: Creating a valid user
    const { user } = await sut.execute({
      name: 'Marcus Vynicius',
      email: 'marcusvynicius@test.com',
      password: '123456',
    })

    // Assertion: User created with ID
    expect(user.id).toEqual(expect.any(String))
  })

  it('Should hash user password upon registration', async () => {
    // Execution: Create user
    const { user } = await sut.execute({
      name: 'Marcus Vynicius',
      email: 'marcusvynicius@test.com',
      password: '123456',
    })

    // Assertion: Verify if stored password is hashed, not plain text
    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('Should not be able to register with same email twice', async () => {
    const email = 'marcusvynicius@test.com'

    // Setup: First registration
    await sut.execute({
      name: 'Marcus Vynicius',
      email,
      password: '123456',
    })

    // Assertion: Second registration with same email should fail
    await expect(
      sut.execute({
        name: 'Marcus Vynicius',
        email,
        password: '123456',
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
