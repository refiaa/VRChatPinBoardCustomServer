import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { config } from './config/env.config';
import { connectDatabase } from './config/database';
import routes from './routes';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    private initializeMiddlewares(): void {
        // CORS configuration for VRChat
        this.app.use(cors({
            origin: '*',
            methods: ['GET', 'POST'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        // Request logging middleware
        this.app.use((req: Request, _res: Response, next: NextFunction) => {
            console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
            next();
        });
    }

    private initializeRoutes(): void {
        this.app.use('/', routes);

        // Health check endpoint
        this.app.get('/health', (_req: Request, res: Response) => {
            res.status(200).json({ status: 'ok' });
        });

        // Handle 404
        this.app.use((_req: Request, res: Response) => {
            res.status(404).json({ error: 'Not Found' });
        });
    }

    private initializeErrorHandling(): void {
        this.app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
            console.error('Unhandled error:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
    }

    public async start(): Promise<void> {
        try {
            await connectDatabase();

            this.app.listen(config.port, () => {
                console.log(`Server running on port ${config.port} in ${config.env} mode`);
            });
        } catch (error) {
            console.error('Failed to start server:', error);
            process.exit(1);
        }
    }
}

const server = new App();
server.start().catch(console.error);

export default server.app;