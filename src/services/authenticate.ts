import type { User } from '@/generated/prisma/client.js'
import type { UsersRepository } from '@/repositories/users-repository.js'

import { InvalidCredentialsError } from './errors/invalid-credentials-error.js'

import { compare } from 'bcryptjs'
import { TokenGenerate } from '@/utils/jwt-create.js'

export interface AuthenticateServiceRequest {
    email: string
    password: string
}

export interface AuthenticateServiceResponse {
    user: User
}

export class AuthenticateService {
    constructor(private usersRepository: UsersRepository) { }
    
    async execute({ email, password }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
        
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatch = await compare(password, user.password_hash)

        if (!doesPasswordMatch) {
            throw new InvalidCredentialsError()
        }

        
        
        return { user }
    }
}
