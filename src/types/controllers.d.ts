import type * as enums from '../enums';
import type ImagesController from '../presentation/controllers/images';
import type AddImagesController from '../presentation/controllers/images/create';
import type GetImagesController from '../presentation/controllers/images/get';

export interface IImagesController {
  [enums.EControllerActions.Add]: AddImagesController;
  [enums.EControllerActions.Get]: GetImagesController;
}

export interface IInnerController {
  [enums.EControllers.Images]: IImagesController;
}

export interface IController {
  [enums.EControllers.Images]: ImagesController;
}

export interface IBaseInnerController {
  handle: (req: express.Request, res: express.Response) => Promise<void>;
}
