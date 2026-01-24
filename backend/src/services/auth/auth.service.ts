import prisma from '../../lib/prisma';
import { AuthUtils } from '../../utils/auth';
import { UserRole } from '@prisma/client';

export class AuthService {
    /**
     * Inscrit un nouvel utilisateur et son profil associé
     */
    static async register(userData: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        role: UserRole;
    }) {
        const existingUser = await prisma.user.findUnique({
            where: { email: userData.email },
        });

        if (existingUser) {
            throw new Error('Cet email est déjà utilisé');
        }

        const passwordHash = await AuthUtils.hashPassword(userData.password);

        // Utilisation d'une transaction Prisma pour s'assurer que l'user ET le profile sont créés
        const newUser = await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    email: userData.email,
                    passwordHash,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    role: userData.role,
                },
            });

            await tx.profile.create({
                data: {
                    userId: user.id,
                    // Autres champs par défaut si nécessaire
                },
            });

            return user;
        });

        const { passwordHash: _, ...userWithoutPassword } = newUser;
        const token = AuthUtils.generateToken({ id: newUser.id, role: newUser.role });

        return { user: userWithoutPassword, token };
    }

    /**
     * Connecte un utilisateur existant
     */
    static async login(email: string, pass: string) {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new Error('Identifiants invalides');
        }

        const isMatch = await AuthUtils.comparePassword(pass, user.passwordHash);
        if (!isMatch) {
            throw new Error('Identifiants invalides');
        }

        const { passwordHash: _, ...userWithoutPassword } = user;
        const token = AuthUtils.generateToken({ id: user.id, role: user.role });

        return { user: userWithoutPassword, token };
    }
}
