import { Request, Response, NextFunction } from 'express';
import { AuthUtils } from '../utils/auth';

export interface AuthRequest extends Request {
    user?: {
        id: string;
        role: string;
    };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            error: 'Authentification requise',
        });
    }

    const token = authHeader.split(' ')[1];
    const decoded = AuthUtils.verifyToken(token);

    if (!decoded) {
        return res.status(401).json({
            success: false,
            error: 'Token invalide ou expiré',
        });
    }

    req.user = decoded;
    next();
};
