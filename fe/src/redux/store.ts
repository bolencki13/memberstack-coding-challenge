import { ReduxProcessStore } from 'ts-redux-process'
import { AuthState } from 'ts-easy-jwt-client/dist/redux-process/types/ProcessGroupFactory'
import auth from './auth'
import plan, { PlanState } from './plan'

export type RootState = {
  auth: AuthState
  plan: PlanState
}

const processStore = new ReduxProcessStore()
processStore.addProcessGroup(auth).addProcessGroup(plan)

export default processStore
