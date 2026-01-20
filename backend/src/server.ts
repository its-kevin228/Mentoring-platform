import App from './app';
import { pool } from './services/database';
import { env } from './config/env';

// Fonction pour tester la connexion à la base de données
async function testDatabaseConnection(): Promise<void> {
  try {
    const client = await pool.connect();
    console.log('✅ Connexion à la base de données réussie');
    client.release();
  } catch (error) {
    console.error(' Impossible de se connecter à la base de données:');
    console.error(error);
    console.log('Vérifie que:');
    console.log('   1. PostgreSQL est installé et démarré');
    console.log('   2. La base de données existe');
    console.log('   3. Les identifiants dans .env sont corrects');
    process.exit(1);
  }
}

// Fonction pour démarrer l'application
async function startServer(): Promise<void> {
  console.log('Démarrage de l\'application...');
  console.log(` Environnement: ${env.NODE_ENV}`);
  
  // Test de la base de données
  await testDatabaseConnection();
  
  // Démarrage du serveur
  const app = new App();
  app.listen();
}

// Gestion des erreurs non catchées
process.on('uncaughtException', (error: Error) => {
  console.error('Erreur non capturée:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
  console.error(' Rejet de promesse non géré:', reason);
});

// Démarrage
startServer().catch(console.error);