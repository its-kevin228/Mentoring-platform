import { Application } from 'express';
declare class App {
    app: Application;
    private port;
    constructor();
    private initializeMiddlewares;
    private initializeRoutes;
    private initializeErrorHandling;
    listen(): void;
}
export default App;
//# sourceMappingURL=app.d.ts.map