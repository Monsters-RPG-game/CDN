// eslint-disable-next-line max-classes-per-file
import type { IImageRepository } from './imageRepository';
import type { IUseCase } from '../shared/useCase';
import type Image from 'domain/image';

interface IGetImageDto {
  name: string;
}

export class ImageDto {
  private readonly _name: string;

  get name(): string {
    return this._name;
  }

  constructor(name: string) {
    this._name = name;
  }

  static from(image: Image): ImageDto {
    return new ImageDto(image.name);
  }
}

export class GetImageUseCase implements IUseCase<IGetImageDto, ImageDto> {
  private readonly _imageRepository: IImageRepository;

  get imageRepository(): IImageRepository {
    return this._imageRepository;
  }

  constructor(imageRepository: IImageRepository) {
    this._imageRepository = imageRepository;
  }

  async execute(input: IGetImageDto): Promise<ImageDto> {
    const image = await this.imageRepository.find(input.name);

    if (!image) {
      throw new Error('No image with that name');
    }

    return ImageDto.from(image);
  }
}
