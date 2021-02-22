import { Router } from 'express'
import auth from './auth'
import version from './version'
import payments from './payments'
import plan from './plan'

const router = Router()

router.use('/auth', auth)
router.use('/version', version)
router.use('/payments', payments)
router.use('/plan', plan)

export default router
