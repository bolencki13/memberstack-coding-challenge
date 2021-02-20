import MemberStackError from './MemberStackError'

export default class ForbiddenError extends MemberStackError {
  constructor() {
    super('Forbidden.', 403)
  }
}
