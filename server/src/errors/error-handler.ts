import { Request, Response, NextFunction } from 'express';


class CustomError extends Error {
  statusCode: number
  constructor(message: any, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

export const errorHandlerMiddleWare = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  return res.status(err.statusCode || 500).json({ message: err.message })
}