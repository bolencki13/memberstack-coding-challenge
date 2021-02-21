import { Router } from 'express'
import stripe from './stripe'
import authorization from '../../authorization'

const router = Router()

router.use(authorization)
router.use('/stripe', stripe)

export default router
