import { Request, Response } from 'express'
import MemberStackError from '../errors/MemberStackError'
import { errors } from 'ts-easy-jwt-auth'
import UnauthorizedError from '../errors/UnauthorizedError'
import ForbiddenError from '../errors/ForbiddenError'
import { ValidationError } from 'joi'

export default function errorHandler(
  err: Error,
  _: Request,
  res: Response,
  __: Function
) {
  if (err instanceof ValidationError) {
    return res.status(400).json({
      statusCode: 400,
      message: err.message,
      detauls: err.details[0]
    })
  }

  if (
    err instanceof errors.UnauthorizedError ||
    err instanceof errors.InvalidRoleError
  ) {
    err = new UnauthorizedError()
  }

  if (
    err instanceof errors.ForbiddenError ||
    err instanceof errors.DuplicateUserError
  ) {
    err = new ForbiddenError()
  }

  if (err instanceof MemberStackError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
      details: {}
    })
  }

  console.error(err)
  return res.status(500).json({
    statusCode: 500,
    message: 'An internal server error has occured.'
  })
}
