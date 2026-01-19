import { Router } from 'express'

import { verifyJwt } from '@/http/middlewares/verify-jwt.js'

import { createWorkEntries } from './create.js'
import { updateWorkEntries } from './update.js'

export const workEntrieRoutes = Router()

workEntrieRoutes.post('/create', verifyJwt, createWorkEntries)
workEntrieRoutes.put('/update/:workEntryId', verifyJwt, updateWorkEntries)