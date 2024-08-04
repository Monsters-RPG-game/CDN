import Image from '../../../domain/image/image';
import { CannotAddImageError } from '../../../errors';
import type { ITransferImageDto, ITransferImageResult } from './types';
import type { IUseCase } from '../../../types';
import type { IFileRepository } from '../../file/repository';
import type { IImageRepository } from '../repository';

export default class TransferImageUseCase implements IUseCase<ITransferImageDto, ITransferImageResult> {
  private readonly _imageRepository: IImageRepository;
  private readonly _fileRepository: IFileRepository;

  private get imageRepository(): IImageRepository {
    return this._imageRepository;
  }

  private get fileRepository(): IFileRepository {
    return this._fileRepository;
  }

  constructor(imageRepository: IImageRepository, fileRepository: IFileRepository) {
    this._fileRepository = fileRepository;
    this._imageRepository = imageRepository;
  }

  async execute(input: ITransferImageDto): Promise<ITransferImageResult> {
    const newPath = this.fileRepository.transfer(input.path, './files/images', input.filename);
    if (!newPath) throw new CannotAddImageError();

    const image = new Image(input.name, newPath, input.filename);

    const result = await this.imageRepository.add(image);

    if (!result) {
      throw new Error('Could not save image.');
    }

    return {
      id: result,
    };
  }
}
