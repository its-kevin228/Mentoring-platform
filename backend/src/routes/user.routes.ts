import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Route pour l'annuaire des mentors : GET /api/users/mentors
router.get('/mentors', UserController.getMentors);

// Route pour mettre à jour son propre profil : PATCH /api/users/profile
router.patch('/profile', authenticate, UserController.updateMyProfile);

// Route pour le profil d'un utilisateur : GET /api/users/:id
router.get('/:id', UserController.getUserProfile);

export default router;
