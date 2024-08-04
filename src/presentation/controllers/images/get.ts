import mongoose from 'mongoose';
import AbstractInnerController from '../../../tools/abstract/innerController';
import Log from '../../../tools/logger';
import type * as enums from '../../../enums';
import type express from 'express';
import path from 'path';

export default class GetImageController extends AbstractInnerController<
  enums.EControllers.Images,
  enums.EControllerActions.Get
> {
  override async handle(req: express.Request, res: express.Response): Promise<void> {
    this.validate(req);

    const result = await this.useCase.execute({
      name: req.query.name as string,
      id: req.query.id as string,
    });

    if (!result) {
      res.status(404).json({ message: 'Cannot find data' });
    } else {
      this.setHeaders(res, result.path);
      const splitted = result.path.split('./');
      const removedRelativePath = splitted[1]!;

      await this.sendFile(removedRelativePath, res);
    }
  }

  private validate(req: express.Request): void {
    const name = req.query.name as string;
    const id = req.query.id as string;

    if (!id && !name) throw new Error('Name nor id provided');

    if (!name) {
      if (!id) throw new Error('id not provided');
      if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('Id is incorrect');
    }

    if (!id) {
      if (!name) throw new Error('Name not provided');
    }
  }

  private async sendFile(location: string, res: express.Response): Promise<void> {
    return new Promise((resolve, reject) => {
      res.sendFile(location, { root: path.join(__dirname, '../../../../..') }, (err) => {
        if (!err) return resolve();

        Log.error('File send', 'Cannot send file', err);
        return reject(err);
      });
    });
  }

  private setHeaders(res: express.Response, location: string): void {
    if (location.includes('jpg')) {
      res.setHeader('Content-Type', 'image/jpg');
    } else if (location.includes('jpeg')) {
      res.setHeader('Content-Type', 'image/jpeg');
    } else if (location.includes('png')) {
      res.setHeader('Content-Type', 'image/png');
    }
  }
}
