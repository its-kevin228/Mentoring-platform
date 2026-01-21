import { z } from 'zod';
declare const envSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodEnum<["development", "production", "test"]>>;
    PORT: z.ZodDefault<z.ZodEffects<z.ZodString, number, string>>;
    DATABASE_URL: z.ZodString;
    DB_HOST: z.ZodDefault<z.ZodString>;
    DB_PORT: z.ZodDefault<z.ZodEffects<z.ZodString, number, string>>;
    DB_NAME: z.ZodString;
    DB_USER: z.ZodString;
    DB_PASSWORD: z.ZodString;
    JWT_SECRET: z.ZodString;
    JWT_EXPIRES_IN: z.ZodDefault<z.ZodString>;
    BCRYPT_SALT_ROUNDS: z.ZodDefault<z.ZodEffects<z.ZodString, number, string>>;
    FRONTEND_URL: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    NODE_ENV: "development" | "production" | "test";
    PORT: number;
    DATABASE_URL: string;
    DB_HOST: string;
    DB_PORT: number;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    BCRYPT_SALT_ROUNDS: number;
    FRONTEND_URL: string;
}, {
    DATABASE_URL: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    JWT_SECRET: string;
    NODE_ENV?: "development" | "production" | "test" | undefined;
    PORT?: string | undefined;
    DB_HOST?: string | undefined;
    DB_PORT?: string | undefined;
    JWT_EXPIRES_IN?: string | undefined;
    BCRYPT_SALT_ROUNDS?: string | undefined;
    FRONTEND_URL?: string | undefined;
}>;
export type EnvConfig = z.infer<typeof envSchema>;
export declare const env: {
    NODE_ENV: "development" | "production" | "test";
    PORT: number;
    DATABASE_URL: string;
    DB_HOST: string;
    DB_PORT: number;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    BCRYPT_SALT_ROUNDS: number;
    FRONTEND_URL: string;
};
export {};
//# sourceMappingURL=env.d.ts.map