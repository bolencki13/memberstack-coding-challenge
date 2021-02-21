import { ContainerInterface } from '@halliganjs/service-container'
import { UserModel } from '../models/User'
import { PaymentModel } from '../models/Payment'

export default function (container: ContainerInterface) {
  container.singleton('models', function () {
    return {
      User: UserModel,
      Payment: PaymentModel
    }
  })
}
