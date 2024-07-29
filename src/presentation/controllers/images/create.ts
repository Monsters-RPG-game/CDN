// eslint-disable-next-line max-classes-per-file
import CreatedImageDto from '../outputs/create';
import type CreateImageUseCase from '../../../application/image/create';
import type { ICreateImageDto } from '../../../application/image/create/types';
import type express from 'express';

export default class CreateImageController {
  private readonly _useCase: CreateImageUseCase;

  private get useCase(): CreateImageUseCase {
    return this._useCase;
  }

  constructor(useCase: CreateImageUseCase) {
    this._useCase = useCase;
  }

  async handle(req: express.Request, res: express.Response): Promise<void> {
    this.validate(req);

    const result = await this.useCase.execute(req.body as ICreateImageDto);

    const response: CreatedImageDto = new CreatedImageDto(result.id);

    res.status(201).json(response);
  }

  private validate(req: express.Request): void {
    const body = req.body as ICreateImageDto;

    if (!body || Object.keys(body).length === 0) throw new Error('No data provided');
    if (!body.name) throw new Error('Missing name in add');
  }
}
