import { Router } from 'express'
import container from '../../../../container'
import Payment from '../../../../services/Payment'
import StripeChargeProcessor from '../../../../services/Payment/ChargeProcessor/StripeChargeProcessor'
import * as Joi from 'joi'
import plan from '../../../../plan'

const router = Router()

const schema = Joi.object({
  token: Joi.string().trim().required()
})

router.post('/', async function (req, res, next) {
  try {
    const form = schema.validate(req.body)
    if (form.error) {
      throw form.error
    }

    const processor = new StripeChargeProcessor({
      source: form.value.token
    })

    const payment = container.make<Payment>(Payment)
    const result = await payment.create(
      {
        user: res.locals.user,
        charge: {
          amount: plan.paymentOptions[0].amount,
          description: `${plan.name} - ${plan.description}`
        }
      },
      processor
    )

    res.json(result.toJSON())
  } catch (e) {
    next(e)
  }
})

export default router
