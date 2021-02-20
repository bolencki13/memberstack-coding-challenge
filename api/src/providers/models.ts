import { ContainerInterface } from '@halliganjs/service-container'
import { UserModel } from '../models/User'

export default function (container: ContainerInterface) {
  container.singleton('models', function () {
    return {
      User: UserModel
    }
  })
}
