import { Request, Response } from 'express'
import container from '../container'
import { EasyJWTAuth } from 'ts-easy-jwt-auth'
import ForbiddenError from '../errors/ForbiddenError'

export default async function authorization(
  req: Request,
  res: Response,
  next: Function
) {
  try {
    const authorization = req.headers.authorization
    if (!authorization) {
      throw new ForbiddenError()
    }

    const aryAuth = authorization.split(' ')
    if (aryAuth.length !== 2) {
      throw new ForbiddenError()
    }

    const token = aryAuth[1]
    const auth = container.make<EasyJWTAuth>('auth')

    const result = await auth.validate(token)

    res.locals = {
      user: result.user,
      tokens: result.tokens
    }

    return next()
  } catch (e) {
    next(e)
  }
}
