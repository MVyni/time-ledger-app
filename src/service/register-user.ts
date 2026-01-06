import type { User } from "@/generated/prisma/client.js"
import type { UsersRepository } from "@/repositories/users-repository.js"

import { hash } from 'bcryptjs'

interface RegisterServiceReq {
    name: string
    email: string
    password: string
}

interface RegisterServiceRes {
    user: User
}

export class RegisterUserService {
    constructor(private usersRepository: UsersRepository) { }
    
    async execute({ name, email, password }: RegisterServiceReq): Promise<RegisterServiceRes> {

        const password_hash = await hash(password, 6)
        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new Error()
        }

        const user = await this.usersRepository.create({
            name,
            email,
            password_hash,
        })

        return { user }
    } 
}
