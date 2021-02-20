import { Router } from 'express'
import container from '../../../container'
import { EasyJWTAuth } from 'ts-easy-jwt-auth'
import * as Joi from 'joi'

const router = Router()

const schema = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().trim().min(8).required()
})

router.post('/', async function (req, res, next) {
  try {
    const form = schema.validate(req.body)
    if (form.error) {
      throw form.error
    }

    const auth = container.make<EasyJWTAuth>('auth')
    const result = await auth.login(form.value.email, form.value.password)

    res.json({
      user: result.user.toJSON(),
      tokens: result.tokens
    })
  } catch (e) {
    next(e)
  }
})

export default router
