import request from 'supertest'
import type { Express } from 'express'
import { beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
    let app: Express

  beforeAll(async () => {
    app = (await import('@/app.js')).app
  })

  it('should be able to authenticate an user', async () => {
      await request(app)
          .post('/user/register')
          .send({
            name: 'Dominic Ferreira',
            email: 'dominicferreira@teste.com',
            password: '123456',
        })

      const req = await request(app)
          .post('/user/session')
          .send({
            email: 'dominicferreira@teste.com',
            password: '123456',
        })

    expect(req.statusCode).toEqual(200)
    expect(req.body).toEqual({
      token: expect.any(String),
    })
  })
})
