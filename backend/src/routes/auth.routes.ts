import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import {
    registerSchema,
    loginSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    refreshSchema
} from '../validations/auth.validation';

const router = Router();

// Route pour l'inscription : POST /api/auth/register
router.post('/register', validate(registerSchema), AuthController.register);

// Route pour la connexion : POST /api/auth/login
router.post('/login', validate(loginSchema), AuthController.login);

// Routes pour la récupération de mot de passe
router.post('/forgot-password', validate(forgotPasswordSchema), AuthController.forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), AuthController.resetPassword);

// Route pour la vérification d'email
router.get('/verify-email', AuthController.verifyEmail);

// Route pour rafraîchir le token
router.post('/refresh', validate(refreshSchema), AuthController.refresh);

export default router;
