import { Pool } from 'pg';
declare class Database {
    private static instance;
    private pool;
    private constructor();
    static getInstance(): Database;
    getPool(): Pool;
    private setupEventListeners;
    testConnection(): Promise<boolean>;
    close(): Promise<void>;
}
export declare const db: Database;
export declare const pool: Pool;
export {};
//# sourceMappingURL=database.d.ts.map