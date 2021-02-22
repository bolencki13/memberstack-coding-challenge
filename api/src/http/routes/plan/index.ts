import { Router } from 'express'
import plan from '../../../plan'
import authorization from '../../authorization'

const router = Router()

router.use(authorization)
router.get('/', async function (_, res, next) {
  try {
    res.json(plan)
  } catch (e) {
    next(e)
  }
})

export default router
