import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.string().transform(Number).default('5000'),

    DATABASE_URL: z.string().url(),
    DB_HOST: z.string().default('localhost'),
    DB_PORT: z.string().transform(Number).default('5432'),
    DB_NAME: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),

    JWT_SECRET: z.string().min(32),
    JWT_EXPIRES_IN: z.string().default('7d'),

    BCRYPT_SALT_ROUNDS: z.string().transform(Number).default('10'),

    FRONTEND_URL: z.string().url().default('http://localhost:3000'),

    // Configuration SMTP pour Nodemailer
    SMTP_HOST: z.string().default('smtp.gmail.com'),
    SMTP_PORT: z.string().transform(Number).default('587'),
    SMTP_USER: z.string().email(),
    SMTP_PASSWORD: z.string(),
});

export type EnvConfig = z.infer<typeof envSchema>;

const envParseResult = envSchema.safeParse(process.env);

if (!envParseResult.success) {
    console.error('Invalid environment variables:', envParseResult.error.format());
    process.exit(1);
}

export const env = envParseResult.data;
