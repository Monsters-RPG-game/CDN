import type { IGetImageDto } from './types';
import type { IImage } from '../../../domain/image/types';
import type { IUseCase } from '../../../types/';
import type { IImageRepository } from '../repository';

export default class GetImageUseCase implements IUseCase<IGetImageDto, IImage> {
  private readonly _imageRepository: IImageRepository;

  private get imageRepository(): IImageRepository {
    return this._imageRepository;
  }

  constructor(imageRepository: IImageRepository) {
    this._imageRepository = imageRepository;
  }

  async execute(input: IGetImageDto): Promise<IImage> {
    const image = await this.imageRepository.get(input.name);

    if (!image) {
      throw new Error('No image with that name');
    }

    return image;
  }
}
