import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password, email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = await User.create({
      email,
      username,
      password: hash,
    });

    const token = jwt.sign(
      { id: newUser._id },
      process.env.SECRET_KEY as string,
      { expiresIn: '7d' }
    );

    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json({ newUser, token });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  try {
    const oldUser = await User.findOne({ username });
    if (!oldUser) {
      return res.status(404).json({ message: 'User doesn"t exists' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect) {
      return res.status(404).json({ message: 'Invalid password or username' });
    }

    const token = jwt.sign(
      { id: oldUser._id },
      process.env.SECRET_KEY as string,
      { expiresIn: '7d' }
    );

    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(oldUser);
  } catch (error) {
    next(error);
  }
};
