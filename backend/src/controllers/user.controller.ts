import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { ApiResponse } from '../types';

export class UserController {
    /**
     * Handler pour récupérer la liste des mentors
     */
    static async getMentors(req: Request, res: Response) {
        try {
            const { fieldOfStudy, institution, studyLevel } = req.query;

            const mentors = await UserService.getMentors({
                fieldOfStudy: fieldOfStudy as string,
                institution: institution as string,
                studyLevel: studyLevel as string,
            });

            const response: ApiResponse<typeof mentors> = {
                success: true,
                data: mentors,
            };

            return res.status(200).json(response);
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: "Erreur lors de la récupération des mentors",
            });
        }
    }

    /**
     * Handler pour récupérer un utilisateur spécifique
     */
    static async getUserProfile(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await UserService.getUserById(id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    error: "Utilisateur non trouvé",
                });
            }

            const response: ApiResponse<typeof user> = {
                success: true,
                data: user,
            };

            return res.status(200).json(response);
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: "Erreur lors de la récupération du profil",
            });
        }
    }
}
