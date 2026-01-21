"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = exports.db = void 0;
const pg_1 = require("pg");
const env_1 = require("../config/env");
const dbConfig = {
    host: env_1.env.DB_HOST,
    port: env_1.env.DB_PORT,
    database: env_1.env.DB_NAME,
    user: env_1.env.DB_USER,
    password: env_1.env.DB_PASSWORD,
    ssl: env_1.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
};
class Database {
    constructor() {
        this.pool = new pg_1.Pool(dbConfig);
        this.setupEventListeners();
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
    getPool() {
        return this.pool;
    }
    setupEventListeners() {
        this.pool.on('connect', () => {
            console.log('Nouvelle connexion à la base de données établie');
        });
        this.pool.on('error', (err) => {
            console.error(' Erreur de connexion à la base de données:', err.message);
        });
    }
    async testConnection() {
        try {
            const client = await this.pool.connect();
            console.log('Connexion à la base de données réussie');
            client.release();
            return true;
        }
        catch (error) {
            console.error('Erreur de connexion à la base de données:', error);
            return false;
        }
    }
    async close() {
        await this.pool.end();
        console.log('connexion à la base de données fermée');
    }
}
exports.db = Database.getInstance();
exports.pool = exports.db.getPool();
//# sourceMappingURL=database.js.map