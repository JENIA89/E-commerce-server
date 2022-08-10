import express from 'express';
import { register, login, profile } from '../controllers/auth';
import { authCheck } from '../middleware/auth';
import { loginValidation, registerValidation } from '../validations/auth';

const router = express.Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/profile', authCheck, profile);

export default router;
