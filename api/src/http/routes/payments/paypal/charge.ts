import { Router } from 'express'
import container from '../../../../container'
import Payment from '../../../../services/Payment'
import PaypalChargeProcessor from '../../../../services/Payment/ChargeProcessor/PaypalChargeProcessor'
import * as Joi from 'joi'
import plan from '../../../../plan'

const router = Router()

const schema = Joi.object({
  createdAt: Joi.date().iso().required(),
  id: Joi.string().trim().required()
})

router.post('/', async function (req, res, next) {
  try {
    const form = schema.validate(req.body)
    if (form.error) {
      throw form.error
    }

    const processor = new PaypalChargeProcessor({
      clientCharge: {
        id: form.value.id,
        createdAt: form.value.createdAt
      }
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
