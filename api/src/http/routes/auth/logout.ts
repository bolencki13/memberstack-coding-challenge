import { Router } from 'express'
import container from '../../../container'
import { EasyJWTAuth } from 'ts-easy-jwt-auth'

const router = Router()

router.post('/', async function (_, res, next) {
  try {
    const auth = container.make<EasyJWTAuth>('auth')
    auth.logout(res.locals.tokens.access)

    res.json({
      user: null,
      tokens: {
        access: null,
        refresh: null
      }
    })
  } catch (e) {
    next(e)
  }
})

export default router
