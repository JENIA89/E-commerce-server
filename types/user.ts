import { Document } from 'mongoose';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  _doc?: object;
}

export interface IUserAuthInfoRequest extends Request {
  userId: string;
}
