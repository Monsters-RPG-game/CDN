import type * as enums from '../../enums';
import type express from 'express';
import type * as types from 'types';

export default abstract class AbstractInnerController<T extends enums.EControllers, N extends enums.EControllerActions>
  implements types.IBaseInnerController
{
  private readonly _useCase: types.IInnerControllerUseCase[T][N];

  protected get useCase(): types.IInnerControllerUseCase[T][N] {
    return this._useCase;
  }

  constructor(useCase: types.IInnerControllerUseCase[T][N]) {
    this._useCase = useCase;
  }

  async handle(_req: express.Request, _res: express.Response): Promise<void> {
    return new Promise((resolve) => {
      resolve();
    });
  }
}
