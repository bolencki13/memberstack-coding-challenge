import { Router } from 'express'

const router = Router()

router.get('/', async function (_, res, next) {
  try {
    res.json({
      user: res.locals.user.toJSON()
    })
  } catch (e) {
    next(e)
  }
})

export default router
