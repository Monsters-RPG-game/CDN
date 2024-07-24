import express from 'express';
import AppRouter from './router.js';
import Log from '../../tools/logger';
import http from 'http';

export default class Router {
  private readonly _app: express.Express;
  private readonly _router: AppRouter;
  private _server: http.Server | undefined = undefined;

  constructor() {
    this._app = express();
    this._router = new AppRouter(this.app);
  }

  get app(): express.Express {
    return this._app;
  }

  get router(): AppRouter {
    return this._router;
  }

  private get server(): http.Server {
    return this._server!;
  }

  init(): void {
    this.initRouter();
    this.initServer();
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
