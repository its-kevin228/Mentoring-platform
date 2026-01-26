import { Request, Response } from 'express';
import { AuthService } from '../services/auth/auth.service';
import { ApiResponse } from '../types';

export class AuthController {
    /**
     * Handler pour l'inscription
     */
    static async register(req: Request, res: Response) {
        try {
            const { email, password, firstName, lastName, role } = req.body;

            // Validation basique (à renforcer avec Zod plus tard)
            if (!email || !password || !firstName || !lastName || !role) {
                return res.status(400).json({
                    success: false,
                    error: 'Tous les champs sont obligatoires',
                });
            }

            const result = await AuthService.register({
                email,
                password,
                firstName,
                lastName,
                role,
            });

            const response: ApiResponse<typeof result> = {
                success: true,
                data: result,
                message: 'Inscription réussie. Vérifiez vos emails pour activer votre compte.',
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
     * Handler pour la connexion
     */
    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    error: 'Email et mot de passe requis',
                });
            }

            const result = await AuthService.login(email, password);

            const response: ApiResponse<typeof result> = {
                success: true,
                data: result,
                message: 'Connexion réussie',
            };

            return res.status(200).json(response);
        } catch (error: any) {
            return res.status(401).json({
                success: false,
                error: error.message,
            });
        }
    }

    /**
     * Handler pour mot de passe oublié
     */
    static async forgotPassword(req: Request, res: Response) {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(400).json({
                    success: false,
                    error: 'Email requis',
                });
            }

            await AuthService.forgotPassword(email);

            return res.status(200).json({
                success: true,
                message: 'Si un compte existe, un email de récupération a été envoyé.',
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    }

    /**
     * Handler pour réinitialiser le mot de passe
     */
    static async resetPassword(req: Request, res: Response) {
        try {
            const { token, password } = req.body;

            if (!token || !password) {
                return res.status(400).json({
                    success: false,
                    error: 'Token et nouveau mot de passe requis',
                });
            }

            await AuthService.resetPassword(token, password);

            return res.status(200).json({
                success: true,
                message: 'Mot de passe mis à jour avec succès.',
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                error: error.message,
            });
        }
    }

    /**
     * Handler pour vérifier l'email
     */
    static async verifyEmail(req: Request, res: Response) {
        try {
            const { token } = req.query;

            if (!token) {
                return res.status(400).json({
                    success: false,
                    error: 'Token manquant',
                });
            }

            await AuthService.verifyEmail(token as string);

            return res.status(200).json({
                success: true,
                message: 'Email vérifié avec succès !',
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                error: error.message,
            });
        }
    }

    /**
     * Handler pour rafraîchir le token
     */
    static async refresh(req: Request, res: Response) {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                return res.status(400).json({
                    success: false,
                    error: 'Refresh token manquant',
                });
            }

            const result = await AuthService.refresh(refreshToken);

            return res.status(200).json({
                success: true,
                data: result,
            });
        } catch (error: any) {
            return res.status(401).json({
                success: false,
                error: error.message,
            });
        }
    }
}
