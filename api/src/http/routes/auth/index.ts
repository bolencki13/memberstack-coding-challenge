import { Router } from 'express'
import register from './register'
import login from './login'
import refresh from './refresh'
import me from './me'
import logout from './logout'
import authorization from '../../authorization'

const router = Router()

router.use('/register', register)
router.use('/login', login)
router.use('/refresh', refresh)
router.use('/me', authorization, me)
router.use('/logout', authorization, logout)

export default router
