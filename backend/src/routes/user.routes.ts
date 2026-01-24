import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();

// Route pour l'annuaire des mentors : GET /api/users/mentors
router.get('/mentors', UserController.getMentors);

// Route pour le profil d'un utilisateur : GET /api/users/:id
router.get('/:id', UserController.getUserProfile);

export default router;
