import type { IImageEntity } from './types';

export default class Image implements IImageEntity {
  readonly name: string;
  readonly _id: string | undefined;

  constructor(name: string, id?: string) {
    this.name = name;
    this._id = id;
  }
}
