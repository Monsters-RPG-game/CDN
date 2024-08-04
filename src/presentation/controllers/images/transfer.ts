import TransferedImageDto from '../outputs/transfer';
import type TransferImageUseCase from '../../../application/image/transfer';
import type { ITransferImageDto } from '../../../application/image/transfer/types';
import type express from 'express';

export default class TransferImageController {
  private readonly _useCase: TransferImageUseCase;

  private get useCase(): TransferImageUseCase {
    return this._useCase;
  }

  constructor(useCase: TransferImageUseCase) {
    this._useCase = useCase;
  }

  async handle(req: express.Request, res: express.Response): Promise<void> {
    this.validate(req);

    const result = await this.useCase.execute({
      ...req.body,
      path: './uploads',
      filename: req.file?.filename,
    } as ITransferImageDto);

    const response = new TransferedImageDto(result.id);

    res.status(201).json(response);
  }

  private validate(req: express.Request): void {
    const body = req.body as ITransferImageDto;

    if (!body || Object.keys(body).length === 0) throw new Error('No data provided');
    if (!body.name) throw new Error('Missing name in add');
  }
}
