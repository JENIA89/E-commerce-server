import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUserAuthInfoRequest } from '../types/user';

export const authCheck = async (
  req: IUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ message: 'You are not authenticated!' });
  }

  const decoded = jwt.verify(
    token,
    process.env.SECRET_KEY as string
  ) as JwtPayload;
  req.userId = decoded?._id;
  next();
};
