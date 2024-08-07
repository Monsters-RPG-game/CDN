import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { IncorrectDataType, InternalError, FileTooBigError } from '../../errors';
import Log from '../../tools/logger';
import errLogger from '../../tools/logger/logger';
import type { IFullError } from '../../types/error.js';
import type { Express } from 'express';

export default class Middleware {
  generateMiddleware(app: Express): void {
    app.use(express.json({ limit: '500kb' }));
    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(
      cors({
        origin: '*',
        credentials: true,
      }),
    );

    app.use((_req: express.Request, res, next: express.NextFunction) => {
      res.header('Content-Type', 'application/json;charset=UTF-8');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });
  }

  generateErrHandler(app: Express): void {
    app.use(
      (err: express.Errback | IFullError, req: express.Request, res: express.Response, _next: express.NextFunction) => {
        errLogger
          .error('Caught new generic error')
          .error(`Caused by ${req.ip ?? 'unknown ip'}`)
          .error(JSON.stringify(err));
        const error = err as IFullError;

        if (error.name === 'MulterError') return this.handleMulterError(res, error);

        if (error.message.includes('is not valid JSON')) {
          Log.error('Middleware', 'Received req is not of json type', error.message, error.stack);
          const { message, name, status } = new IncorrectDataType();
          return res.status(status).json({ message, name });
        }
        if (error.name === 'SyntaxError') {
          Log.error('Middleware', 'Generic err', error.message, error.stack);
          const { message, code, name, status } = new InternalError();
          return res.status(status).json({ message, code, name });
        }
        if (error.code !== undefined) {
          const { message, code, name, status } = error;
          return res.status(status).json({ message, code, name });
        }
        Log.error('Middleware', 'Generic err', error.message, error.stack);
        const { message, code, name, status } = new InternalError();
        return res.status(status).json({ message, code, name });
      },
    );
  }

  private handleMulterError(res: express.Response, error: IFullError): void {
    switch (error.message) {
      case 'File too large':
        res.status(400).json({
          message: new FileTooBigError().message,
          name: new FileTooBigError().name,
          code: new FileTooBigError().code,
        });
        break;
      default:
        res.status(500).json({
          message: new InternalError().message,
          code: new InternalError().code,
          name: new InternalError().name,
          status: new InternalError().status,
        });
        break;
    }
  }
}
