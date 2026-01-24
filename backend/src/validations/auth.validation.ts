import { z } from 'zod';
import { UserRole } from '@prisma/client';

export const registerSchema = z.object({
    body: z.object({
        email: z.string().email('Email invalide'),
        password: z.string().min(8, 'Le mot de passe doit faire au moins 8 caractères'),
        firstName: z.string().min(2, 'Prénom trop court'),
        lastName: z.string().min(2, 'Nom trop court'),
        role: z.nativeEnum(UserRole, {
            errorMap: () => ({ message: 'Rôle invalide (ADMIN, MENTOR, ou MENTORE)' }),
        }),
    }),
});

export const loginSchema = z.object({
    body: z.object({
        email: z.string().email('Email invalide'),
        password: z.string().min(1, 'Mot de passe requis'),
    }),
});
