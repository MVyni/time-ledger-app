import { Router } from 'express'

import { verifyJwt } from '@/http/middlewares/verify-jwt.js'

import { createWorkEntrie } from './create.js'

export const workEntrieRoutes = Router()

workEntrieRoutes.post('/create', verifyJwt, createWorkEntrie)