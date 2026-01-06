import type { Request, Response } from "express";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js";
import { RegisterUserService } from "@/service/register-user.js";

import z from "zod";

export async function registerUser(req: Request, res: Response) {
    
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.email(),
        password: z.string().min(6)
    })

    const { name, email, password } = registerBodySchema.parse(req.body)

    try {
        
        const usersRepository = new PrismaUsersRepository()
        const registerUserService = new RegisterUserService(usersRepository)

        await registerUserService.execute({
            name,
            email,
            password
        })

    } catch (error) {
        return res.status(409).send({ message: error })
    }

    return res.status(201).send()
}