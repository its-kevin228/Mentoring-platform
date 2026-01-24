import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import { ApiResponse } from './types';


// Import des routes
import authRoutes from './routes/auth.routes';
// import mentorRoutes from './routes/mentor.routes';

class App {
  public app: Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = env.PORT;

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    // Security
    this.app.use(helmet());

    // CORS
    this.app.use(cors({
      origin: env.FRONTEND_URL,
      credentials: true,
    }));

    // Rate limiting
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limite chaque IP à 100 requêtes par fenêtre
      message: 'Trop de requêtes depuis cette IP, veuillez réessayer plus tard.',
    });

    this.app.use('/api/', limiter);

    // Body parsing
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Logging (basique)
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
      next();
    });
  }

  private initializeRoutes(): void {
    // Health check
    this.app.get('/api/health', (req: Request, res: Response) => {
      const response: ApiResponse<{ status: string; timestamp: string }> = {
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
    this.app.use('/api/auth', authRoutes);
    // this.app.use('/api/mentors', mentorRoutes);

    // Route 404
    this.app.use('*', (req: Request, res: Response) => {
      const ApiResponse: ApiResponse<null> = {
        success: false,
        error: 'Route non trouvée',
        data: null
      };
      res.status(404).json(ApiResponse);
    });
  }

  private initializeErrorHandling(): void {
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error('❌ Erreur:', err.stack);

      const ApiResponse: ApiResponse<null> = {
        success: false,
        error: env.NODE_ENV === 'development' ? err.message : 'Une erreur est survenue',
        data: null
      };

      res.status(500).json(ApiResponse);
    });
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`🚀 Serveur backend démarré sur le port ${this.port}`);
      console.log(`Environnement: ${env.NODE_ENV}`);
      console.log(` Health check: http://localhost:${this.port}/api/health`);
    });
  }
}

export default App;