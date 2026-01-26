import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export class AuthUtils {
    private static readonly SALT_ROUNDS = 10;

    static async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.SALT_ROUNDS);
    }

    static async comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    static generateToken(payload: object): string {
        return jwt.sign(payload, env.JWT_SECRET, {
            expiresIn: '15m', // Access token court (15 min)
        });
    }

    static generateRefreshToken(payload: object): string {
        return jwt.sign(payload, env.JWT_SECRET, {
            expiresIn: '7d', // Refresh token long (7 jours)
        });
    }

    static verifyToken(token: string): any {
        try {
            return jwt.verify(token, env.JWT_SECRET);
        } catch (error) {
            return null;
        }
    }
}
