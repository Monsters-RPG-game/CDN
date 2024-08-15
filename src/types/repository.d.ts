import type Image from '../domain/image/image';
import type * as enums from '../enums';
import type { IImage } from 'domain/image/types';

export interface IRepositoryGetData {
  [enums.EModules.Image]: IImage | null;
}

export interface IRepositoryAddData {
  [enums.EModules.Image]: Image;
}

export interface IGenericRepository<T extends enums.EModules> {
  get(id: string): Promise<IRepositoryGetData[T]>;
  add(data: IRepositoryAddData[T]): Promise<string>;
}
