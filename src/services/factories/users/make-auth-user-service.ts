import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { AuthenticateService } from '@/services/user/authenticate.js'

export function makeAuthenticateUserService() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new AuthenticateService(usersRepository)

  return useCase
}
