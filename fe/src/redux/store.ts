import { ReduxProcessStore } from 'ts-redux-process'
import { AuthState } from 'ts-easy-jwt-client/dist/redux-process/types/ProcessGroupFactory'
import auth from './auth'
import plan, { PlanState } from './plan'
import payment, { PaymentState } from './payment'

export type RootState = {
  auth: AuthState
  plan: PlanState
  payment: PaymentState
}

const processStore = new ReduxProcessStore()
processStore.addProcessGroup(auth).addProcessGroup(plan).addProcessGroup(payment)

export default processStore
