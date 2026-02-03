import request from 'supertest'
import type { Express } from 'express'
import { describe, expect, it, beforeAll } from 'vitest'

describe('Register (e2e)', () => {
  let app: Express

  beforeAll(async () => {
    app = (await import('@/app.js')).app
  })
  
  it('should be able to register a user', async () => {
      const req = await request(app)
          .post('/user/register')
          .send({
            name: 'Dominic Ferreira',
            email: 'dominicferreira2@teste.com',
            password: '123456',
        })

    expect(req.statusCode).toEqual(201)
  })
})
