import MemberStackError from './MemberStackError'

export default class UnauthorizedError extends MemberStackError {
  constructor() {
    super('Unauthorized.', 401)
  }
}
