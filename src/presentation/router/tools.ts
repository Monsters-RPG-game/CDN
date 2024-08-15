import multer from 'multer';
import { FileNotAllowedError, MissingFileNameError } from '../../errors';
import Log from '../../tools/logger';
import type express from 'express';
import type { StorageEngine } from 'multer';
import fs from 'fs';
import path from 'path';

export default class Tools {
  private readonly _storage: StorageEngine;

  constructor() {
    this._storage = multer.diskStorage({
      destination(_req, _file, cb) {
        const uploadDir = './uploads';
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
      },
      filename(_req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
      },
    });
  }

  private get storage(): StorageEngine {
    return this._storage;
  }

  fileUpload(): multer.Multer {
    const filter = (_req: express.Request, file: Express.Multer.File, callback: multer.FileFilterCallback): void => {
      const allowed = ['image/png', 'image/jpeg', 'image/jpg'];

      if (!allowed.includes(file.mimetype)) {
        return callback(new FileNotAllowedError());
      }

      return callback(null, true);
    };

    return multer({
      storage: this.storage,
      limits: { fileSize: 3145728 },
      fileFilter: filter,
    });
  }

  fileUploadValidation(req: express.Request, _res: express.Response, next: express.NextFunction): void {
    if (!(req.body as { name: string })?.name || (req.body as { name: string })?.name.length === 0) {
      throw new MissingFileNameError();
    }

    next();
  }

  cleanUp(req: express.Request): void {
    if (!req.file) return;

    try {
      const location = './uploads';

      const uploads = fs.readdirSync(location);

      if (!uploads.includes(req.file.filename)) return;

      fs.unlinkSync(`${location}/${req.file.filename}`);
    } catch (err) {
      Log.error('File cleanUp', 'Could not wipe temp file', req.file, err);
    }
  }
}
