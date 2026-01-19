import type { Request, Response } from 'express'
import { makeRegisterUserService } from '@/services/factories/users/make-register-user-service.js'

import z from 'zod'

export async function registerUser(req: Request, res: Response) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(req.body)

    const registerUserService = makeRegisterUserService()

    await registerUserService.execute({
      name,
      email,
      password,
    })
  
  return res.status(201).send()
}
