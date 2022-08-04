import express from 'express';
import { register, login } from '../controllers/auth';
import { registerValidation } from '../validations/auth';

const router = express.Router();

router.post('/register', registerValidation, register);
router.post('/login', login);

export default router;
