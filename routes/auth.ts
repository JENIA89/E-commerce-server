import express from 'express';
import { register, login } from '../controllers/auth';
import { loginValidation, registerValidation } from '../validations/auth';

const router = express.Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

export default router;
