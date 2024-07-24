import type { GetImageUseCase } from '../../../application/getImage';
import type express from 'express';

export default class GetImageController {
  private readonly _useCase: GetImageUseCase;

  private get useCase(): GetImageUseCase {
    return this._useCase;
  }

  constructor(useCase: GetImageUseCase) {
    this._useCase = useCase;
  }

  async handle(req: express.Request, res: express.Response): Promise<void> {
    this.validate(req);

    const result = await this.useCase.execute({
      name: req.query.name as string,
    });

    res.json(result);
  }

  private validate(req: express.Request): void {
    if (!req.query.name) throw new Error('Name not provided');
  }
}
