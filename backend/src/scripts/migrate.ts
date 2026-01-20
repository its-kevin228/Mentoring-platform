import { pool } from '../services/database';
import fs from 'fs/promises';
import path from 'path';

async function runMigration(): Promise<void> {
  try {
    const schemaPath = path.join(__dirname, '../../database/schema.sql');
    const schema = await fs.readFile(schemaPath, 'utf8');
    
    console.log('🚀 Exécution des migrations...');
    await pool.query(schema);
    console.log('✅ Migrations terminées avec succès');
  } catch (error) {
    console.error('❌ Erreur lors des migrations:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigration();