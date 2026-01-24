import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { registerSchema, loginSchema } from '../validations/auth.validation';

const router = Router();

// Route pour l'inscription : POST /api/auth/register
router.post('/register', validate(registerSchema), AuthController.register);

// Route pour la connexion : POST /api/auth/login
router.post('/login', validate(loginSchema), AuthController.login);

export default router;
