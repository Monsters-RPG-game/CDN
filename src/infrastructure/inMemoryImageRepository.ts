import type { IImageRepository } from '../application/imageRepository';
import type Image from '../domain/image';

export default class InMemoryImageRepository implements IImageRepository {
  private readonly _images: Image[] = [];

  private get images(): Image[] {
    return this._images;
  }

  async save(image: Image): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.images.push(image);
      resolve(true);
    });
  }

  async find(name: string): Promise<Image | null> {
    return new Promise<Image | null>((resolve) => {
      resolve(this.images.find((x) => x.name === name) ?? null);
    });
  }
}
