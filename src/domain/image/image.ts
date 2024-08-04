import type { IImageEntity } from './types';

export default class Image implements IImageEntity {
  readonly name: string;
  readonly path: string;
  readonly filename: string;
  readonly _id: string | undefined;

  constructor(name: string, path: string, filename: string, id?: string) {
    this.name = name;
    this._id = id;
    this.path = path;
    this.filename = filename;
  }
}
