import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'invalid mail format').isEmail(),
  body('username', 'minimum username length 5 characters').isLength({ min: 5 }),
  body('password', 'minimum password length 5 characters').isLength({ min: 5 }),
];

export const loginValidation = [
  body('username', 'minimum username length 5 characters').isLength({ min: 5 }),
  body('password', 'minimum password length 5 characters').isLength({ min: 5 }),
];
