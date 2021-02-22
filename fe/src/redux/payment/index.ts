import { ReduxProcessGroup } from 'ts-redux-process'
import { PaymentJSON } from '../../types'
import { RootState } from '../store'
import StripePaymentCreateProcess from './StripePaymentCreate'
import PaymentAllProcess from './all'

export type PaymentState = PaymentJSON | null

const paymentGroup = new ReduxProcessGroup<PaymentState, RootState>('payment', {
  processes: [
    StripePaymentCreateProcess,
    PaymentAllProcess
  ],
  defaultState: null
})

export default paymentGroup

export {
  StripePaymentCreateProcess,
  PaymentAllProcess
}
