import { Router } from 'express';
import { MentorshipController } from '../controllers/mentorship.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Toutes les routes de mentoring sont protégées
router.use(authenticate);

// POST /api/mentorship/request : Envoyer une demande
router.post('/request', MentorshipController.createRequest);

// GET /api/mentorship/my-requests : Liste des demandes (mentor ou mentoré)
router.get('/my-requests', MentorshipController.getMyRequests);

// PATCH /api/mentorship/request/:id/status : Accepter/Refuser
router.patch('/request/:id/status', MentorshipController.updateStatus);

export default router;
