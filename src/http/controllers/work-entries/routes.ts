import { Router } from 'express'

import { verifyJwt } from '@/http/middlewares/verify-jwt.js'

import { createWorkEntries } from './create.js'

export const workEntrieRoutes = Router()

workEntrieRoutes.post('/create', verifyJwt, createWorkEntries)