import { Router } from 'express'
import container from '../../../container'
import { EasyJWTAuth } from 'ts-easy-jwt-auth'
import * as Joi from 'joi'

const router = Router()

const schema = Joi.object({
  refreshToken: Joi.string().trim().required()
})

router.post('/', async function (req, res, next) {
  try {
    const form = schema.validate(req.body)
    if (form.error) {
      throw form.error
    }

    const auth = container.make<EasyJWTAuth>(EasyJWTAuth)
    const result = await auth.refresh(form.value.refreshToken)
    res.json({
      tokens: result.tokens
    })
  } catch (e) {
    next(e)
  }
})

export default router
