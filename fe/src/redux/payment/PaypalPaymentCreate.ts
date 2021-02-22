import { ReduxProcess } from 'ts-redux-process'
import { PaymentJSON } from '../../types'
import { PaymentState } from './'
import { RootState } from '../store'
import { paymentPaypalCreateRequest } from '../requests'
import networker from '../networker'

type Form = {
  id: string
  createdAt: string
}

export default class PaypalPaymentCreateProcess extends ReduxProcess<Form, PaymentJSON, PaymentState, RootState> {
  async performAction (form: Form): Promise<PaymentJSON> {
    const result = await networker.execute(paymentPaypalCreateRequest, form)
    return result.data
  }

  getNewState (payload: PaymentJSON) {
    return payload
  }
}
