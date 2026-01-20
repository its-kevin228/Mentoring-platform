import { Pool, PoolConfig } from 'pg';
import { env } from '../config/env';

const dbConfig: PoolConfig = {
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  ssl: env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

class Database {
  private static instance: Database;
  private pool: Pool;

  private constructor() {
    this.pool = new Pool(dbConfig);
    this.setupEventListeners();
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public getPool(): Pool {
    return this.pool;
  }

  private setupEventListeners(): void {
    this.pool.on('connect', () => {
      console.log('Nouvelle connexion à la base de données établie');
    });

    this.pool.on('error', (err: Error) => {
      console.error(' Erreur de connexion à la base de données:', err.message);
    });
  }

  public async testConnection(): Promise<boolean> {
    try {
      const client = await this.pool.connect();
      console.log('Connexion à la base de données réussie');
      client.release();
      return true;
    } catch (error) {
      console.error('Erreur de connexion à la base de données:', error);
      return false;
    }
  }

  public async close(): Promise<void> {
    await this.pool.end();
    console.log('connexion à la base de données fermée');
  }
}

export const db = Database.getInstance();
export const pool = db.getPool();