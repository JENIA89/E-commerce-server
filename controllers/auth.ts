import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const register = async (req: express.Request, res: express.Response) => {
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

    res.status(200).json({ newUser, token });
  } catch (error) {
    console.log();
  }
};
