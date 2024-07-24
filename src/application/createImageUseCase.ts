import Image from '../domain/image';
import type { IImageRepository } from './imageRepository';
import type { IUseCase } from '../shared/useCase';

interface ICreateImageDto {
  name: string;
}

export interface ICreateImageResult {
  imageId: string;
}

export class CreateImageUseCase implements IUseCase<ICreateImageDto, ICreateImageResult> {
  private readonly _imageRepo: IImageRepository;

  private get imageRepo(): IImageRepository {
    return this._imageRepo;
  }

  constructor(imageRepo: IImageRepository) {
    this._imageRepo = imageRepo;
  }

  async execute(input: ICreateImageDto): Promise<ICreateImageResult> {
    const image = new Image(input.name);

    const result = await this.imageRepo.save(image);

    if (!result) {
      throw new Error('Could not save image.');
    }

    return {
      imageId: image.name,
    };
  }
}
