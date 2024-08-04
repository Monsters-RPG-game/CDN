import { NoDataError } from '../../../errors';
import type { IGetImageDto } from './types';
import type { IImage } from '../../../domain/image/types';
import type { IUseCase } from '../../../types/';
import type { IFileRepository } from '../../file/repository';
import type { IImageRepository } from '../repository';

export default class GetImageUseCase implements IUseCase<IGetImageDto, IImage> {
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

  async execute(input: IGetImageDto): Promise<IImage> {
    const image = input.id
      ? await this.imageRepository.get(input.id)
      : await this.imageRepository.getByName(input.name as string);

    if (!image) {
      throw new NoDataError();
    }

    this.fileRepository.verify(image.path);

    return image;
  }
}
