"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../services/database");
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
async function runMigration() {
    try {
        const schemaPath = path_1.default.join(__dirname, '../../database/schema.sql');
        const schema = await promises_1.default.readFile(schemaPath, 'utf8');
        console.log('🚀 Exécution des migrations...');
        await database_1.pool.query(schema);
        console.log('✅ Migrations terminées avec succès');
    }
    catch (error) {
        console.error('❌ Erreur lors des migrations:', error);
        process.exit(1);
    }
    finally {
        await database_1.pool.end();
    }
}
runMigration();
//# sourceMappingURL=migrate.js.map