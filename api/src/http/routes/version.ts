import { Router } from 'express'
import * as pJson from '../../../package.json'

const router = Router()

router.get('/', function (_, res, next) {
  try {
    return res.send(pJson.version)
  } catch (e) {
    next(e)
  }
})

export default router
