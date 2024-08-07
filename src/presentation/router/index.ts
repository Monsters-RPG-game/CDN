import express from 'express';
import Middleware from './middleware';
import AppRouter from './router';
import Log from '../../tools/logger';
import http from 'http';

export default class Router {
  private readonly _app: express.Express;
  private readonly _middleware: Middleware;
  private readonly _router: AppRouter;
  private _server: http.Server | undefined = undefined;

  constructor() {
    this._app = express();
    this._middleware = new Middleware();
    this._router = new AppRouter(this.app);
  }

  private get app(): express.Express {
    return this._app;
  }

  private get middleware(): Middleware {
    return this._middleware;
  }

  private get router(): AppRouter {
    return this._router;
  }

  private get server(): http.Server {
    return this._server!;
  }

  init(): void {
    this.initMiddleware();
    this.initRouter();
    this.initServer();
    this.initErrHandler();
  }

  /**
   * Close server
   */
  close(): void {
    Log.log('Server', 'Closing');
    if (!this.server) return;

    this.server.closeAllConnections();
    this.server.close();
  }

  /**
   * Init middleware
   */
  private initMiddleware(): void {
    this.middleware.generateMiddleware(this.app);
  }

  /**
   * Init err handler, catching errors in whole app
   */
  private initErrHandler(): void {
    this.middleware.generateErrHandler(this.app);
  }

  /**
   * Init basic routes.
   */
  private initRouter(): void {
    this.router.initRoutes();
  }

  /**
   * Init server
   */
  private initServer(): void {
    if (process.env.NODE_ENV === 'test') return;
    this._server = http.createServer(this.app);

    this.server.listen(5000, () => {
      Log.log('Server', `Listening on ${5000}`);
    });
  }
}
