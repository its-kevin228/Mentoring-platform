import prisma from '../lib/prisma';
import { RequestStatus } from '@prisma/client';

export class MentorshipService {
    /**
     * Crée une nouvelle demande de mentoring
     */
    static async createRequest(data: {
        mentorId: string;
        mentoreId: string;
        message?: string;
    }) {
        // Vérifier si une demande est déjà en attente entre ces deux utilisateurs
        const existingRequest = await prisma.mentorshipRequest.findFirst({
            where: {
                mentorId: data.mentorId,
                mentoreId: data.mentoreId,
                status: RequestStatus.PENDING,
            },
        });

        if (existingRequest) {
            throw new Error('Une demande est déjà en attente pour ce mentor');
        }

        // Vérifier que le mentor est bien un mentor
        const mentor = await prisma.user.findUnique({
            where: { id: data.mentorId },
        });

        if (!mentor || mentor.role !== 'MENTOR') {
            throw new Error('L’utilisateur sélectionné n’est pas un mentor');
        }

        return prisma.mentorshipRequest.create({
            data: {
                mentorId: data.mentorId,
                mentoreId: data.mentoreId,
                message: data.message,
            },
            include: {
                mentor: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true,
                    }
                }
            }
        });
    }

    /**
     * Récupère les demandes reçues (pour un mentor)
     */
    static async getReceivedRequests(mentorId: string) {
        return prisma.mentorshipRequest.findMany({
            where: { mentorId },
            include: {
                mentore: {
                    include: {
                        profile: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    /**
     * Récupère les demandes envoyées (pour un mentoré)
     */
    static async getSentRequests(mentoreId: string) {
        return prisma.mentorshipRequest.findMany({
            where: { mentoreId },
            include: {
                mentor: {
                    include: {
                        profile: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    /**
     * Met à jour le statut d'une demande (Accepter/Refuser)
     */
    static async updateRequestStatus(requestId: string, userId: string, status: RequestStatus) {
        const request = await prisma.mentorshipRequest.findUnique({
            where: { id: requestId }
        });

        if (!request) {
            throw new Error('Demande introuvable');
        }

        // Seul le mentor peut accepter ou refuser
        if (request.mentorId !== userId) {
            throw new Error('Non autorisé à modifier cette demande');
        }

        return prisma.mentorshipRequest.update({
            where: { id: requestId },
            data: { status },
        });
    }
}
