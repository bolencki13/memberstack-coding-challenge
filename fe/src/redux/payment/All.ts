import { ReduxProcess } from 'ts-redux-process'
import { PaymentJSON } from '../../types'
import { PaymentState } from './'
import { RootState } from '../store'
import { paymentAllRequest } from '../requests'
import networker from '../networker'

export default class AllProcess extends ReduxProcess<null, [PaymentJSON], PaymentState, RootState> {
  async performAction (): Promise<[PaymentJSON]> {
    const result = await networker.execute(paymentAllRequest)
    return result.data
  }

  getNewState (payload: [PaymentJSON]) {
    return payload[0] || null
  }
}
