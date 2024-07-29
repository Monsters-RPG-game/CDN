import type Image from '../../domain/image/image';
import type { IImage } from '../../domain/image/types';

export interface IImageRepository {
  get(id: string): Promise<IImage | null>;
  add(image: Image): Promise<string>;
}
