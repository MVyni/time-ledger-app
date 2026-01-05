import type { Request, Response, NextFunction } from 'express'
import express from 'express'
import { ZodError } from 'zod'
import { env } from './env/index.js'

export const app = express()

app.use(express.json())

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).send({
      message: 'Validation error. ',
      issues: err.issues,
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(err)
  }

  return res.status(500).send({ message: '❌ Internal server error' })
})
