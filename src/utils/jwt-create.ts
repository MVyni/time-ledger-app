import jwt from 'jsonwebtoken'
import { env } from '@/env/index.js'

interface UserRequest {
  user_id: string
  email: string
}

interface TokenResponse {
  token: string
}

export class TokenGenerate {
  constructor() {}

  execute({ user_id, email }: UserRequest): TokenResponse {
    const secret = env.JWT_SECRET
    const token = jwt.sign(
      {
        email,
      },
      secret,
      {
        subject: user_id,
        expiresIn: '7d',
      }
    )

    return { token }
  }
}
