import express from 'express';
import { EControllerActions, EControllers } from '../../../../../enums';
import handleErr from '../../../../../errors/utils';
import State from '../../../../../tools/state';
import type * as types from '../../../../../types';

export default class GetImages {
  private readonly _router: express.Router;

  constructor() {
    this._router = express.Router();
    this.init();
  }

  get router(): express.Router {
    return this._router;
  }

  init(): void {
    this.router.get('/', async (req, res) => {
      try {
        const controller = State.controllers.resolve(EControllers.Images)!.resolve(EControllerActions.Get)!;
        await controller.handle(req, res);
        res.status(200).send();
      } catch (err) {
        handleErr(err as types.IFullError, res);
      }
    });
  }
}
