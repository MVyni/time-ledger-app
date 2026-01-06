import { Router } from 'express'
import { registerUser } from './users/register.js'

export const userRoutes = Router()

userRoutes.post('/register', registerUser)
