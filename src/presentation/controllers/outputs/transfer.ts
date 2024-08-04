import type { ITransferImageResult } from '../../../application/image/transfer/types';

export default class TransferedImageDto implements ITransferImageResult {
  readonly id: string;

  constructor(name: string) {
    this.id = name;
  }
}
