import { ContainerInterface } from '@halliganjs/service-container'
import { EasyJWTAuth } from 'ts-easy-jwt-auth'
import { IUserModel, UserRoles } from '../models/User'
import UnauthorizedError from '../errors/UnauthorizedError'

export default function (container: ContainerInterface) {
  container.singleton('auth', function () {
    let accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
    if (!accessTokenSecret) {
      throw new Error('ACCESS_TOKEN_SECRET has not been set in the env')
    }

    let refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
    if (!refreshTokenSecret) {
      throw new Error('REFRESH_TOKEN_SECRET has not been set in the env')
    }

    let passwordResetTokenSecret = process.env.PASSWORD_RESET_TOKEN_SECRET
    if (!passwordResetTokenSecret) {
      throw new Error('PASSWORD_RESET_TOKEN_SECRET has not been set in the env')
    }

    const auth = new EasyJWTAuth({
      roles: {
        available: Object.values(UserRoles),
        default: UserRoles.USER
      },
      secrets: {
        accessToken: accessTokenSecret,
        refreshToken: refreshTokenSecret,
        passwordResetToken: passwordResetTokenSecret
      }
    })

    const User = container.make('models').User as IUserModel
    auth.onRequestUserForUsername(async (username) => {
      const user = await User.findOne({
        email: username
      }).exec()
      if (!user) {
        throw new UnauthorizedError()
      }
      return user
    })

    return auth
  })
}
