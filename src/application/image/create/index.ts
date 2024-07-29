import Image from '../../../domain/image/image';
import type { ICreateImageDto, ICreateImageResult } from './types';
import type { IUseCase } from '../../../types';
import type { IImageRepository } from '../repository';

export default class CreateImageUseCase implements IUseCase<ICreateImageDto, ICreateImageResult> {
  private readonly _imageRepository: IImageRepository;

  private get imageRepository(): IImageRepository {
    return this._imageRepository;
  }

  constructor(imageRepository: IImageRepository) {
    this._imageRepository = imageRepository;
  }

  async execute(input: ICreateImageDto): Promise<ICreateImageResult> {
    const image = new Image(input.name);

    const result = await this.imageRepository.add(image);

    if (!result) {
      throw new Error('Could not save image.');
    }

    return {
      id: result,
    };
  }
}
