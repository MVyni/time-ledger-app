import { Router } from 'express'

import { verifyJwt } from '@/http/middlewares/verify-jwt.js'

import { createWorkEntries } from './create.js'
import { updateWorkEntries } from './update.js'
import { deleteWorkEntries } from './delete.js'
import { history } from './fetch-history.js'
import { list } from './fetch-entries.js'

export const workEntrieRoutes = Router()

workEntrieRoutes.post('/create', verifyJwt, createWorkEntries)

workEntrieRoutes.get('/history', verifyJwt, history)
workEntrieRoutes.get('/list', verifyJwt, list)

workEntrieRoutes.put('/update/:workEntryId', verifyJwt, updateWorkEntries)

workEntrieRoutes.delete('/delete/:workEntryId', verifyJwt, deleteWorkEntries)
