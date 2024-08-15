import * as enums from './enums';
import ImageModel from './infrastructure/models/image';
import ImagesController from './presentation/controllers/images';
import Log from './tools/logger';
import type * as types from './types';

export default class Bootstrap {
  private _controllers: Map<enums.EControllers, types.IController[enums.EControllers]> = new Map();

  private get controllers(): Map<enums.EControllers, types.IController[enums.EControllers]> {
    return this._controllers;
  }

  register<T extends enums.EControllers>(target: T, value: types.IController[T]): void {
    this.controllers.set(target, value);
  }

  resolve<T extends enums.EControllers>(target: T): types.IController[T] | undefined {
    return this.controllers.get(target);
  }

  init(): void {
    this.register(enums.EControllers.Images, new ImagesController(ImageModel));
  }

  close(): void {
    Log.log('Bootstrap', 'Closing');
  }
}
