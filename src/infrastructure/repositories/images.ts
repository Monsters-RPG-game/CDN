import AbstractRepository from '../../tools/abstract/repository';
import type { IImageRepository } from '../../application/image/repository';
import type { IImage } from '../../domain/image/types';
import type * as enums from '../../enums';
import type Image from '../models/image';

export default class ImageRepository
  extends AbstractRepository<IImage, typeof Image, enums.EModules.Image>
  implements IImageRepository {}
