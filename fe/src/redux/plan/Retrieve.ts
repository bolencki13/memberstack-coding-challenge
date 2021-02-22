import { ReduxProcess } from 'ts-redux-process'
import { PlanJSON } from '../../types'
import { PlanState } from './'
import { RootState } from '../store'
import { planRetrieveRequest } from '../requests'
import networker from '../networker'

export default class RetrieveProcess extends ReduxProcess<null, PlanJSON, PlanState, RootState> {
  async performAction (): Promise<PlanJSON> {
    const result = await networker.execute(planRetrieveRequest)
    return result.data
  }

  getNewState (payload: PlanJSON, state: PlanState) {
    return {
      ...state,
      default: payload
    }
  }
}
