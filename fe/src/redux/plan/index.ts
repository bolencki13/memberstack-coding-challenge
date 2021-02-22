import { ReduxProcessGroup } from 'ts-redux-process'
import { PlanJSON } from '../../types'
import { RootState } from '../store'
import PlanRetrieveProcess from './Retrieve'

export type PlanState = {
  default: PlanJSON | null
}

const planGroup = new ReduxProcessGroup<PlanState, RootState>('plan', {
  processes: [
    PlanRetrieveProcess
  ],
  defaultState: {
    default: null
  }
})

export default planGroup

export {
  PlanRetrieveProcess
}
