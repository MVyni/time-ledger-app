import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { RegisterUserService } from '../user/register-user.js'

export function makeRegisterUserService() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new RegisterUserService(usersRepository)

  return useCase
}
