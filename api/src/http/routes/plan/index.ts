import { Router } from 'express'
import plan from '../../../plan'

const router = Router()

router.get('/', async function (_, res, next) {
  try {
    res.json(plan)
  } catch (e) {
    next(e)
  }
})

export default router
