import { Router } from 'express'
import container from '../../../container'
import { EasyJWTAuth } from 'ts-easy-jwt-auth'
import { IUserModel } from '../../../models/User'
import * as Joi from 'joi'

const router = Router()

const schema = Joi.object({
  fullName: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string().trim().min(8).required()
})

router.post('/', async function (req, res, next) {
  try {
    const form = schema.validate(req.body)
    if (form.error) {
      throw form.error
    }

    const auth = container.make<EasyJWTAuth>(EasyJWTAuth)
    const result = await auth.register(form.value.email, form.value.password)

    const User = container.make('models').User as IUserModel
    const user = await User.create({
      fullName: form.value.fullName,
      email: form.value.email,
      hash: result.userInfo.hash,
      role: result.userInfo.role
    })
    res.json({
      user: user.toJSON(),
      tokens: result.tokens
    })
  } catch (e) {
    next(e)
  }
})

export default router
