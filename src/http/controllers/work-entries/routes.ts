import { Router } from 'express'

import { verifyJwt } from '@/http/middlewares/verify-jwt.js'

import { createWorkEntries } from './create.js'
import { updateWorkEntries } from './update.js'
import { deleteWorkEntries } from './delete.js'

export const workEntrieRoutes = Router()

workEntrieRoutes.post('/create', verifyJwt, createWorkEntries)
workEntrieRoutes.put('/update/:workEntryId', verifyJwt, updateWorkEntries)
workEntrieRoutes.delete('/delete/:workEntryId', verifyJwt, deleteWorkEntries)