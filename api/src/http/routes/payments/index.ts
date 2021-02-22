import { Router } from 'express'
import stripe from './stripe'
import authorization from '../../authorization'
import all from './all'

const router = Router()

router.use(authorization)
router.use('/stripe', stripe)
router.use('/', all)

export default router
