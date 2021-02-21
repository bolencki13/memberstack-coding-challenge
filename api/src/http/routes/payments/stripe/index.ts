import { Router } from 'express'
import charge from './charge'

const router = Router()

router.use('/charge', charge)

export default router
