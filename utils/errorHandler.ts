import { ResponseError } from '../types/error';

export const errorHandler = (
  status: number,
  message: string
): ResponseError => {
  const err: ResponseError = new Error();
  err.status = status;
  err.message = message;
  throw err;
};
