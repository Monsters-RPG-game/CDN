import CreateImageController from './create';
import GetImageController from './get';
import CreateImageUseCase from '../../../application/image/create';
import GetImageUseCase from '../../../application/image/get';
import * as enums from '../../../enums';
import ImageRepository from '../../../infrastructure/repositories/images';
import AbstractController from '../../../tools/abstract/controller';
import type ImageModel from '../../../infrastructure/models/image';

export default class ImagesController extends AbstractController<enums.EControllers.Images> {
  constructor(model: typeof ImageModel) {
    super();

    this.init(model);
  }

  private init(model: typeof ImageModel): void {
    const repo = new ImageRepository(model);

    this.register(enums.EControllerActions.Add, new CreateImageController(new CreateImageUseCase(repo)));
    this.register(enums.EControllerActions.Get, new GetImageController(new GetImageUseCase(repo)));
  }
}
