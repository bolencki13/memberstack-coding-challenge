import { EasyJWTNetworker } from 'ts-easy-jwt-client'
import { refreshRequest } from './requests'

const networker = new EasyJWTNetworker({
  refreshRequest,
  
})

export default networker
