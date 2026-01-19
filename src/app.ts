import type { Request, Response, NextFunction } from 'express'
import express from 'express'
import { env } from './env/index.js'

import { ZodError } from 'zod'

import { userRoutes } from './http/controllers/users/routes.js'
import { workEntrieRoutes } from './http/controllers/work-entries/routes.js'

import { InvalidCredentialsError } from './services/errors/invalid-credentials-error.js'
import { MaxDailyOfWorkEntriesError } from './services/errors/max-daily-of-work-entrie-error.js'
import { ResourceNotFoundError } from './services/errors/resource-not-found-error.js'
import { UserAlreadyExistsError } from './services/errors/user-already-exists-error.js'

export const app = express()

app.use(express.json())

app.use('/user', userRoutes)
app.use('/workentrie', workEntrieRoutes)

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).send({
      message: 'Validation error. ',
      issues: err.issues,
    })
  }

  if (err instanceof InvalidCredentialsError) {
    return res.status(400).send({ message: err.message })
  }

  if (err instanceof MaxDailyOfWorkEntriesError) {
    return res.status(409).send({ message: err.message })
  }

  if (err instanceof ResourceNotFoundError) {
    return res.status(404).send({ message: err.message })
  }

  if (err instanceof UserAlreadyExistsError) {
    return res.status(409).send({ message: err.message })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(err)
  }

  return res.status(500).send({ message: '❌ Internal server error' })
})
