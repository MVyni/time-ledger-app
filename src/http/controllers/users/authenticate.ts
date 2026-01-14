import { verifyJwt } from '@/http/middlewares/verify-jwt.js'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error.js'
import { makeAuthenticateUserService } from '@/services/factories/users/make-auth-user-service.js'
import { TokenGenerate } from '@/utils/jwt-create.js'

import type { Request, Response } from 'express'
import { z } from 'zod'

export async function authenticate(req: Request, res: Response) {
    
    const authBodySchema = z.object({
        email: z.email(),
        password: z.string().min(6)
    })

    const { email, password } = authBodySchema.parse(req.body)

    try {
        
        const authenticateUserService = makeAuthenticateUserService()

        const { user } = await authenticateUserService.execute({
            email,
            password
        })

        const tokenGenerate = new TokenGenerate()

        const { token } = tokenGenerate.execute({
          user_id: user.id,
          email: user.email,
        })

        return res.status(200).send({ token })

    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return res.status(400).send({ message: error.message })
        }
        
        throw error
    }
}