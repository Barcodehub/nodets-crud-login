import { Router } from 'express';
import { register, login, getCsrfToken } from '../controllers/authController';

const router = Router();

router.get('/csrf-token', getCsrfToken);
router.post('/register', register);
router.post('/login', login);

export default router;