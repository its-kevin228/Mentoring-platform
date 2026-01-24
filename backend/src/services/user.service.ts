import prisma from '../lib/prisma';
import { UserRole } from '@prisma/client';

export class UserService {
    /**
     * Récupère la liste des mentors avec leurs profils associés
     */
    static async getMentors(filters: {
        fieldOfStudy?: string;
        institution?: string;
        studyLevel?: string;
    }) {
        const mentors = await prisma.user.findMany({
            where: {
                role: UserRole.MENTOR,
                isVerified: true, // Optionnel : ne montrer que les vérifiés ? on peut laisser true par défaut pour la qualité
                profile: {
                    isActive: true,
                    // Application des filtres si présents
                    ...(filters.fieldOfStudy && { fieldOfStudy: { contains: filters.fieldOfStudy, mode: 'insensitive' } }),
                    ...(filters.institution && { institution: { contains: filters.institution, mode: 'insensitive' } }),
                    ...(filters.studyLevel && { studyLevel: filters.studyLevel }),
                }
            },
            include: {
                profile: true,
            },
            orderBy: {
                createdAt: 'desc',
            }
        });

        // On retire les hash de mot de passe avant de renvoyer
        return mentors.map(mentor => {
            const { passwordHash, ...userWithoutPassword } = mentor;
            return userWithoutPassword;
        });
    }

    /**
     * Récupère les détails d'un utilisateur par son ID
     */
    static async getUserById(id: string) {
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                profile: true,
            }
        });

        if (!user) return null;

        const { passwordHash, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}
