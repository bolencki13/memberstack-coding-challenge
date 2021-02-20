import { Request, Response } from 'express'
import LeasilyError from '../errors/MemberStackError'

export default function errorHandler(
  err: Error,
  _: Request,
  res: Response,
  __: Function
) {
  if (err instanceof LeasilyError) {
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
