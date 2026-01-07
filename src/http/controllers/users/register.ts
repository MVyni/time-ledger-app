import type { Request, Response } from "express";
import { makeRegisterUserService } from "@/services/factories/make-register-user-service.js";
import { UserAlreadyExistError } from "@/services/errors/user-already-exist-error.js";

import z from "zod";

export async function registerUser(req: Request, res: Response) {
    
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.email(),
        password: z.string().min(6)
    })

    const { name, email, password } = registerBodySchema.parse(req.body)

    try {
        
        const registerUserService = makeRegisterUserService()

        await registerUserService.execute({
            name,
            email,
            password
        })

    } catch (error) {
        if (error instanceof UserAlreadyExistError) {
            return res.status(409).send({ message: error.message })
        }

        throw error
    }

    return res.status(201).send()
}