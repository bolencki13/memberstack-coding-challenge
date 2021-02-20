import { ReduxProcessStore } from 'ts-redux-process'
import auth from './auth'

const processStore = new ReduxProcessStore()
processStore.addProcessGroup(auth)

export default processStore
