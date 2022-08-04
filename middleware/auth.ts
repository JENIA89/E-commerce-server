import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUserAuthInfoRequest } from '../types/user';
import { errorHandler } from '../utils/errorHandler';

export const authCheck = async (
  req: IUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;

  try {
    if (!token) {
      return next(errorHandler(401, 'You are not authenticated!'));
    }

    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as JwtPayload;
    req.userId = decoded?._id;
    next();
  } catch (error) {
    next(error);
  }
};
