import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUserAuthInfoRequest } from '../types/user';
import { errorHandler } from '../utils/errorHandler';

export const authCheck = async (
  req: IUserAuthInfoRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const { id } = jwt.verify(
        token,
        process.env.SECRET_KEY as string,
      ) as JwtPayload;
      req.userId = id;
      next();
    } catch (error) {
      next(errorHandler(401, 'You are not authenticated!'));
    }
  }
};
