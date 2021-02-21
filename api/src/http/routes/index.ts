import { Router } from 'express'
import auth from './auth'
import version from './version'

const router = Router()

router.use('/auth', auth)
router.use('/version', version)

export default router
