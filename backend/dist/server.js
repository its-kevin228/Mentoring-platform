"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = require("./services/database");
const env_1 = require("./config/env");
// Fonction pour tester la connexion à la base de données
async function testDatabaseConnection() {
    try {
        const client = await database_1.pool.connect();
        console.log('✅ Connexion à la base de données réussie');
        client.release();
    }
    catch (error) {
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
async function startServer() {
    console.log('Démarrage de l\'application...');
    console.log(` Environnement: ${env_1.env.NODE_ENV}`);
    // Test de la base de données
    await testDatabaseConnection();
    // Démarrage du serveur
    const app = new app_1.default();
    app.listen();
}
// Gestion des erreurs non catchées
process.on('uncaughtException', (error) => {
    console.error('Erreur non capturée:', error);
    process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error(' Rejet de promesse non géré:', reason);
});
// Démarrage
startServer().catch(console.error);
//# sourceMappingURL=server.js.map