import { Router } from 'express'

import { registerUser } from './register.js'
import { authenticate } from './authenticate.js'

export const userRoutes = Router()

userRoutes.post('/register', registerUser)
userRoutes.post('/session', authenticate)
