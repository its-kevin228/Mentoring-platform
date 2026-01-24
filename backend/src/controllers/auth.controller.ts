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
                message: 'Inscription réussie',
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
}
