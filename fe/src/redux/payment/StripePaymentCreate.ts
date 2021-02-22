import { ReduxProcess } from 'ts-redux-process'
import { PaymentJSON } from '../../types'
import { PaymentState } from './'
import { RootState } from '../store'
import { paymentStripCreateRequest } from '../requests'
import networker from '../networker'

type Form = {
  token: string
}

export default class StripePaymentCreateProcess extends ReduxProcess<Form, PaymentJSON, PaymentState, RootState> {
  async performAction (form: Form): Promise<PaymentJSON> {
    const result = await networker.execute(paymentStripCreateRequest, form)
    return result.data
  }

  getNewState (payload: PaymentJSON) {
    return payload
  }
}
