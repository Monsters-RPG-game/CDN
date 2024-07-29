import mongoose from 'mongoose';
import AbstractInnerController from '../../../tools/abstract/innerController';
import type * as enums from '../../../enums';
import type express from 'express';

export default class GetImageController extends AbstractInnerController<
  enums.EControllers.Images,
  enums.EControllerActions.Get
> {
  override async handle(req: express.Request, res: express.Response): Promise<void> {
    this.validate(req);

    const result = await this.useCase.execute({
      name: req.query.name as string,
    });

    res.json(result);
  }

  private validate(req: express.Request): void {
    const value = req.query.name as string;

    if (!value) throw new Error('Name not provided');
    if (!mongoose.Types.ObjectId.isValid(value)) throw new Error('Incorrect objectId');
  }
}
