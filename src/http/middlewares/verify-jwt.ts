import { env } from '@/env/index.js'
import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export function verifyJwt(
    req: Request,
    res: Response,
) {
    const authToken = req.headers.authorization

    if (!authToken) {
      return res.status(401).send({ message: 'Token is missing' })
    }

    const token = authToken.split(' ')[1]

    if (!token) {
        return res.status(401).send({ message: 'Unauthorized' })
    }

    try {

        const decoded = jwt.verify(token, env.JWT_SECRET)

        console.log('Decode Here!', decoded)

    } catch (err) {
        return res.status(401).send({ message: 'Unauthorized' })
    }
}