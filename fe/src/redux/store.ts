import { ReduxProcessStore } from 'ts-redux-process'
import { AuthState } from 'ts-easy-jwt-client/dist/redux-process/types/ProcessGroupFactory'
import auth from './auth'

export type RootState = {
  auth: AuthState
}

const processStore = new ReduxProcessStore()
processStore.addProcessGroup(auth)

export default processStore
