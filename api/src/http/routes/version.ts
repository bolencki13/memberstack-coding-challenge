import { Router } from 'express'
import * as pJson from '../../../package.json'

const router = Router()

router.get('/', async function (req, res, next) {
  try {
    return res.send(pJson.version)
  } catch (e) {
    next(e)
  }
})

export default router
