import GetImageController from './get';
import TransferImageController from './transfer';
import GetImageUseCase from '../../../application/image/get';
import TransferImageUseCase from '../../../application/image/transfer';
import * as enums from '../../../enums';
import FilesRepository from '../../../infrastructure/repositories/files';
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
    const fileRepo = new FilesRepository();

    this.register(
      enums.EControllerActions.Transfer,
      new TransferImageController(new TransferImageUseCase(repo, fileRepo)),
    );
    this.register(enums.EControllerActions.Get, new GetImageController(new GetImageUseCase(repo, fileRepo)));
  }
}
