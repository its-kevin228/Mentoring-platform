import { Response } from 'express';
import { MessageService } from '../services/message.service';
import { AuthRequest } from '../middleware/auth.middleware';
import { ApiResponse } from '../types';

export class MessageController {
    /**
     * Envoyer un message
     */
    static async sendMessage(req: AuthRequest, res: Response) {
        try {
            const { receiverId, content } = req.body;
            const senderId = req.user!.id;

            if (!content || content.trim() === '') {
                return res.status(400).json({ success: false, error: 'Le message ne peut pas être vide' });
            }

            const message = await MessageService.sendMessage({
                senderId,
                receiverId,
                content,
            });

            return res.status(201).json({
                success: true,
                data: message,
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                error: error.message,
            });
        }
    }

    /**
     * Liste des conversations
     */
    static async getConversations(req: AuthRequest, res: Response) {
        try {
            const userId = req.user!.id;
            const conversations = await MessageService.getConversations(userId);

            return res.status(200).json({
                success: true,
                data: conversations,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: 'Erreur lors de la récupération des conversations',
            });
        }
    }

    /**
     * Messages d'une conversation spécifique
     */
    static async getChatMessages(req: AuthRequest, res: Response) {
        try {
            const userId = req.user!.id;
            const { otherUserId } = req.params;

            const messages = await MessageService.getMessagesBetweenUsers(userId, otherUserId);

            return res.status(200).json({
                success: true,
                data: messages,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: 'Erreur lors de la récupération des messages',
            });
        }
    }
}
