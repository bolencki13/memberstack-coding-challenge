import { Container } from '@halliganjs/service-container'
import modelsProvider from './providers/models'
import authProvider from './providers/auth'
import paymentProvider from './providers/payment'

const container = new Container()
container
  .provider(modelsProvider)
  .provider(authProvider)
  .provider(paymentProvider)

export default container
