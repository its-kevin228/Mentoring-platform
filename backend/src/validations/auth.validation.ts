import { z } from 'zod';
import { UserRole } from '@prisma/client';

export const registerSchema = z.object({
    body: z.object({
        email: z.string()
            .email('Format d\'email invalide')
            .toLowerCase()
            .trim(),
        password: z.string()
            .min(8, 'Le mot de passe doit faire au moins 8 caractères')
            .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
            .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre'),
        firstName: z.string()
            .min(2, 'Le prénom doit faire au moins 2 caractères')
            .max(50, 'Prénom trop long')
            .trim(),
        lastName: z.string()
            .min(2, 'Le nom doit faire au moins 2 caractères')
            .max(50, 'Nom trop long')
            .trim(),
        role: z.nativeEnum(UserRole, {
            errorMap: () => ({ message: 'Le rôle doit être MENTOR ou MENTORE' }),
        }),
    }),
});

export const loginSchema = z.object({
    body: z.object({
        email: z.string().email('Format d\'email invalide').toLowerCase().trim(),
        password: z.string().min(1, 'Le mot de passe est requis'),
    }),
});

export const forgotPasswordSchema = z.object({
    body: z.object({
        email: z.string().email('Format d\'email invalide').toLowerCase().trim(),
    }),
});

export const resetPasswordSchema = z.object({
    body: z.object({
        token: z.string().min(1, 'Le token de réinitialisation est requis'),
        password: z.string()
            .min(8, 'Le mot de passe doit faire au moins 8 caractères')
            .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
            .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre'),
    }),
});

export const refreshSchema = z.object({
    body: z.object({
        refreshToken: z.string().min(1, 'Le refresh token est requis'),
    }),
});
