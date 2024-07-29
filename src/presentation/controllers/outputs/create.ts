import type { ICreateImageResult } from '../../../application/image/create/types';

export default class CreatedImageDto implements ICreateImageResult {
  readonly id: string;

  constructor(name: string) {
    this.id = name;
  }
}
