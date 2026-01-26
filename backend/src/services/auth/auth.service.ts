import prisma from '../../lib/prisma';
import { AuthUtils } from '../../utils/auth';
import { UserRole } from '@prisma/client';
import { EmailService } from '../email.service';

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
        const crypto = await import('crypto');
        const verificationToken = crypto.randomBytes(32).toString('hex');

        // Utilisation d'une transaction Prisma pour s'assurer que l'user ET le profile sont créés
        const newUser = await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    email: userData.email,
                    passwordHash,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    role: userData.role,
                    isVerified: false, // On demande maintenant une vérification
                    verificationToken,
                },
            });

            await tx.profile.create({
                data: {
                    userId: user.id,
                },
            });

            return user;
        });

        // Envoi de l'email de vérification
        await EmailService.sendVerificationEmail(
            userData.email,
            verificationToken,
            userData.firstName
        );

        return { success: true };
    }

    /**
     * Vérifie l'email d'un utilisateur avec le token e
     */
    static async verifyEmail(token: string) {
        const user = await prisma.user.findFirst({
            where: { verificationToken: token },
        });

        if (!user) {
            throw new Error('Token de vérification invalide');
        }

        await prisma.user.update({
            where: { id: user.id },
            data: {
                isVerified: true,
                verificationToken: null,
            },
        });
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
        const payload = { id: user.id, role: user.role };
        const token = AuthUtils.generateToken(payload);
        const refreshToken = AuthUtils.generateRefreshToken(payload);

        // Mettre à jour le refresh token en base
        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken },
        });

        return { user: userWithoutPassword, token, refreshToken };
    }

    /**
     * Renouvelle l'access token à partir d'un refresh token
     */
    static async refresh(token: string) {
        const payload = AuthUtils.verifyToken(token);
        if (!payload) {
            throw new Error('Refresh token invalide ou expiré');
        }

        const user = await prisma.user.findUnique({
            where: { id: payload.id },
        });

        if (!user || user.refreshToken !== token) {
            throw new Error('Refresh token non reconnu');
        }

        const newAccessToken = AuthUtils.generateToken({ id: user.id, role: user.role });
        const newRefreshToken = AuthUtils.generateRefreshToken({ id: user.id, role: user.role });

        // Rotation du refresh token
        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: newRefreshToken },
        });

        return { token: newAccessToken, refreshToken: newRefreshToken };
    }

    /**
     * Génère un token de réinitialisation de mot de passe
     */
    static async forgotPassword(email: string) {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            // Sécurité : on ne confirme pas si l'email existe
            return;
        }

        const crypto = await import('crypto');
        const resetToken = crypto.randomBytes(32).toString('hex');
        const hash = crypto.createHash('sha256').update(resetToken).digest('hex');

        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetPasswordToken: hash,
                resetPasswordExpires: new Date(Date.now() + 3600000), // 1 heure
            },
        });

        // Envoi de l'email de réinitialisation
        await EmailService.sendPasswordResetEmail(email, resetToken);

        return resetToken; // Retourné pour le dev, à supprimer plus tard
    }

    /**
     * Réinitialise le mot de passe avec un token valide
     */
    static async resetPassword(token: string, newPass: string) {
        const crypto = await import('crypto');
        const hash = crypto.createHash('sha256').update(token).digest('hex');

        const user = await prisma.user.findFirst({
            where: {
                resetPasswordToken: hash,
                resetPasswordExpires: { gt: new Date() },
            },
        });

        if (!user) {
            throw new Error('Token invalide ou expiré');
        }

        const passwordHash = await AuthUtils.hashPassword(newPass);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                passwordHash,
                resetPasswordToken: null,
                resetPasswordExpires: null,
            },
        });
    }
}
