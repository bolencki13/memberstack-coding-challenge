import { ProcessGroupFactory, RequestName } from 'ts-easy-jwt-client/dist/redux-process'
import { meRequest, loginRequest, registerRequest } from '../requests'
import networker from '../networker'
import { RootState } from '../store'

const processGroupFactory = new ProcessGroupFactory<RootState>({
  requests: {
    [RequestName.CURRENT_USER]: meRequest,
    [RequestName.LOGIN]: loginRequest,
    [RequestName.REGISTER]: registerRequest
  },
  networker
})

const processes = processGroupFactory.getProcesses()

export const LoginProcess = processes.LoginProcess
export const RegisterProcess = processes.RegisterProcess
export const MeProcess = processes.CurrentUserProcess

export default processGroupFactory.getProcessGroup()
