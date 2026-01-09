import { Router } from 'express'

import { registerUser } from './users/register.js'
import { authenticate } from './users/authenticate.js'

export const userRoutes = Router()

userRoutes.post('/register', registerUser)
userRoutes.post('/session', authenticate)
