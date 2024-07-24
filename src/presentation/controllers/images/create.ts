// eslint-disable-next-line max-classes-per-file
import type { CreateImageUseCase, ICreateImageResult } from '../../../application/createImageUseCase';
import type { Request, Response } from 'express';

export class CreatedImageDto implements ICreateImageResult {
  readonly imageId: string;

  constructor(name: string) {
    this.imageId = name;
  }
}

export default class CreateImageController {
  private readonly _useCase: CreateImageUseCase;

  private get useCase(): CreateImageUseCase {
    return this._useCase;
  }

  constructor(useCase: CreateImageUseCase) {
    this._useCase = useCase;
  }

  async handle(req: Request, res: Response): Promise<void> {
    const result = await this.useCase.execute({
      name: (req.body as { name: string }).name,
    });

    const response: CreatedImageDto = new CreatedImageDto(result.imageId);

    res.status(201).json(response);
  }
}
