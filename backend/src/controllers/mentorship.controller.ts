import { Response } from 'express';
import { MentorshipService } from '../services/mentorship.service';
import { AuthRequest } from '../middleware/auth.middleware';
import { ApiResponse } from '../types';
import { RequestStatus } from '@prisma/client';

export class MentorshipController {
    /**
     * Créer une demande de mentoring
     */
    static async createRequest(req: AuthRequest, res: Response) {
        try {
            const { mentorId, message } = req.body;
            const mentoreId = req.user!.id;

            if (mentorId === mentoreId) {
                return res.status(400).json({
                    success: false,
                    error: 'Vous ne pouvez pas vous demander en mentoring vous-même',
                });
            }

            const request = await MentorshipService.createRequest({
                mentorId,
                mentoreId,
                message,
            });

            const response: ApiResponse<typeof request> = {
                success: true,
                data: request,
                message: 'Demande envoyée avec succès',
            };

            return res.status(201).json(response);
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                error: error.message,
            });
        }
    }

    /**
     * Récupérer les demandes de l'utilisateur connecté
     */
    static async getMyRequests(req: AuthRequest, res: Response) {
        try {
            const userId = req.user!.id;
            const { role } = req.user!;

            let requests;
            if (role === 'MENTOR') {
                requests = await MentorshipService.getReceivedRequests(userId);
            } else {
                requests = await MentorshipService.getSentRequests(userId);
            }

            const response: ApiResponse<typeof requests> = {
                success: true,
                data: requests,
            };

            return res.status(200).json(response);
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: 'Erreur lors de la récupération des demandes',
            });
        }
    }

    /**
     * Accepter ou refuser une demande
     */
    static async updateStatus(req: AuthRequest, res: Response) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const userId = req.user!.id;

            if (!Object.values(RequestStatus).includes(status)) {
                return res.status(400).json({
                    success: false,
                    error: 'Statut invalide',
                });
            }

            const request = await MentorshipService.updateRequestStatus(id, userId, status as RequestStatus);

            const response: ApiResponse<typeof request> = {
                success: true,
                data: request,
                message: `Demande mise à jour : ${status}`,
            };

            return res.status(200).json(response);
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                error: error.message,
            });
        }
    }
}
