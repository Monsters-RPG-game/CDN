import type Image from '../domain/image';

export interface IImageRepository {
  find(id: string): Promise<Image | null>;
  save(image: Image): Promise<boolean>;
}
