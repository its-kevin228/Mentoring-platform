"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('development'),
    PORT: zod_1.z.string().transform(Number).default('5000'),
    DATABASE_URL: zod_1.z.string().url(),
    DB_HOST: zod_1.z.string().default('localhost'),
    DB_PORT: zod_1.z.string().transform(Number).default('5432'),
    DB_NAME: zod_1.z.string(),
    DB_USER: zod_1.z.string(),
    DB_PASSWORD: zod_1.z.string(),
    JWT_SECRET: zod_1.z.string().min(32),
    JWT_EXPIRES_IN: zod_1.z.string().default('7d'),
    BCRYPT_SALT_ROUNDS: zod_1.z.string().transform(Number).default('10'),
    FRONTEND_URL: zod_1.z.string().url().default('http://localhost:3000'),
});
const envParseResult = envSchema.safeParse(process.env);
if (!envParseResult.success) {
    console.error('Invalid environment variables:', envParseResult.error.format());
    process.exit(1);
}
exports.env = envParseResult.data;
//# sourceMappingURL=env.js.map