"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const env_1 = require("./config/env");
// Import des routes (à créer plus tard)
// import authRoutes from './routes/auth.routes';
// import mentorRoutes from './routes/mentor.routes';
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = env_1.env.PORT;
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }
    initializeMiddlewares() {
        // Security
        this.app.use((0, helmet_1.default)());
        // CORS
        this.app.use((0, cors_1.default)({
            origin: env_1.env.FRONTEND_URL,
            credentials: true,
        }));
        // Rate limiting
        const limiter = (0, express_rate_limit_1.default)({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // Limite chaque IP à 100 requêtes par fenêtre
            message: 'Trop de requêtes depuis cette IP, veuillez réessayer plus tard.',
        });
        this.app.use('/api/', limiter);
        // Body parsing
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        // Logging (basique)
        this.app.use((req, res, next) => {
            console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
            next();
        });
    }
    initializeRoutes() {
        // Health check
        this.app.get('/api/health', (req, res) => {
            const response = {
                success: true,
                data: {
                    status: 'OK',
                    timestamp: new Date().toISOString(),
                },
                message: 'Serveur de mentoring étudiant en ligne',
            };
            res.json(response);
        });
        // Routes principales
        // this.app.use('/api/auth', authRoutes);
        // this.app.use('/api/mentors', mentorRoutes);
        // Route 404
        this.app.use('*', (req, res) => {
            const ApiResponse = {
                success: false,
                error: 'Route non trouvée',
                data: null
            };
            res.status(404).json(ApiResponse);
        });
    }
    initializeErrorHandling() {
        this.app.use((err, req, res, next) => {
            console.error('❌ Erreur:', err.stack);
            const ApiResponse = {
                success: false,
                error: env_1.env.NODE_ENV === 'development' ? err.message : 'Une erreur est survenue',
                data: null
            };
            res.status(500).json(ApiResponse);
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`🚀 Serveur backend démarré sur le port ${this.port}`);
            console.log(`Environnement: ${env_1.env.NODE_ENV}`);
            console.log(` Health check: http://localhost:${this.port}/api/health`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map