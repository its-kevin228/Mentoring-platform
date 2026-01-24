import prisma from '../lib/prisma';

export class MessageService {
    /**
     * Envoie un nouveau message
     */
    static async sendMessage(data: {
        senderId: string;
        receiverId: string;
        content: string;
    }) {
        // Vérifier si une relation de mentoring acceptée existe
        const relationship = await prisma.mentorshipRequest.findFirst({
            where: {
                OR: [
                    { mentorId: data.senderId, mentoreId: data.receiverId, status: 'ACCEPTED' },
                    { mentorId: data.receiverId, mentoreId: data.senderId, status: 'ACCEPTED' },
                ],
            },
        });

        if (!relationship) {
            throw new Error('Vous ne pouvez envoyer des messages qu’à vos mentors ou mentorés acceptés.');
        }

        return prisma.message.create({
            data: {
                senderId: data.senderId,
                receiverId: data.receiverId,
                content: data.content,
            },
            include: {
                sender: {
                    select: { firstName: true, lastName: true }
                }
            }
        });
    }

    /**
     * Récupère la liste des conversations de l'utilisateur
     * (Dernier message avec chaque personne)
     */
    static async getConversations(userId: string) {
        // 1. Récupérer toutes les relations acceptées
        const relationships = await prisma.mentorshipRequest.findMany({
            where: {
                OR: [
                    { mentorId: userId, status: 'ACCEPTED' },
                    { mentoreId: userId, status: 'ACCEPTED' },
                ],
            },
            include: {
                mentor: { select: { id: true, firstName: true, lastName: true, avatarUrl: true, role: true } },
                mentore: { select: { id: true, firstName: true, lastName: true, avatarUrl: true, role: true } },
            },
        });

        // 2. Pour chaque relation, trouver le dernier message
        const conversations = await Promise.all(
            relationships.map(async (rel) => {
                const otherUser = rel.mentorId === userId ? rel.mentore : rel.mentor;

                const lastMessage = await prisma.message.findFirst({
                    where: {
                        OR: [
                            { senderId: userId, receiverId: otherUser.id },
                            { senderId: otherUser.id, receiverId: userId },
                        ],
                    },
                    orderBy: { createdAt: 'desc' },
                });

                // On retourne la conversation même si lastMessage est null
                return {
                    user: otherUser,
                    lastMessage: lastMessage || {
                        content: "Démarrer la discussion...",
                        createdAt: rel.updatedAt, // Date de l'acceptation
                        senderId: "",
                        isRead: true
                    }
                };
            })
        );

        // 3. Trier par date du dernier message ou acceptation
        return conversations.sort((a, b) =>
            new Date(b.lastMessage.createdAt).getTime() - new Date(a.lastMessage.createdAt).getTime()
        );
    }

    /**
     * Récupère les messages entre deux utilisateurs
     */
    static async getMessagesBetweenUsers(userId: string, otherUserId: string) {
        // Marquer les messages reçus comme lus
        await prisma.message.updateMany({
            where: {
                senderId: otherUserId,
                receiverId: userId,
                isRead: false,
            },
            data: { isRead: true },
        });

        return prisma.message.findMany({
            where: {
                OR: [
                    { senderId: userId, receiverId: otherUserId },
                    { senderId: otherUserId, receiverId: userId },
                ],
            },
            orderBy: { createdAt: 'asc' },
        });
    }
}
