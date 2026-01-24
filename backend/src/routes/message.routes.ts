import { Router } from 'express';
import { MessageController } from '../controllers/message.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

// POST /api/messages : Envoyer un message
router.post('/', MessageController.sendMessage);

// GET /api/messages/conversations : Liste des chats
router.get('/conversations', MessageController.getConversations);

// GET /api/messages/:otherUserId : Historique avec quelqu'un
router.get('/:otherUserId', MessageController.getChatMessages);

export default router;
