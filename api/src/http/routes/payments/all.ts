import { Router } from 'express'
import container from '../../../container'
import { IPaymentModel } from '../../../models/Payment'

const router = Router()

router.get('/', async function (_, res, next) {
  try {
    const Payment = container.make('models').Payment as IPaymentModel
    const payments = await Payment.find({
      user: res.locals.user
    }).exec()

    res.json(payments.map((payment) => payment.toJSON()))
  } catch (e) {
    next(e)
  }
})

export default router
