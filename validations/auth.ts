import { body } from 'express-validator';

export const registerValidation = [
  body('email').isEmail(),
  body('username').isLength({ min: 5 }),
  body('password').isLength({ min: 6 }),
];
