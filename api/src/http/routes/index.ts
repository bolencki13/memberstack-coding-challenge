import { Router } from 'express'
import auth from './auth'
import version from './version'
import payments from './payments'

const router = Router()

router.use('/auth', auth)
router.use('/version', version)
router.use('/payments', payments)

export default router
