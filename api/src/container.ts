import { Container } from '@halliganjs/service-container'
import modelsProvider from './providers/models'
import authProvider from './providers/auth'

const container = new Container()
container.provider(modelsProvider).provider(authProvider)

export default container
