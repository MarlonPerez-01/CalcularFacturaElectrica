import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/HttpException';
import logger from '../helpers/Logger';

const ErrorHandler = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const status = error.status || 500;
  // const message = error.message || 'Comuniquese con el administrador';

  const status = error.status || 500;

  let msg = error.message;
  if (status === 500) {
    msg = 'Comuniquese con el administrador';
    logger.error(error.message);
  }

  res.status(status).json({ msg, status });
};

export default ErrorHandler;
