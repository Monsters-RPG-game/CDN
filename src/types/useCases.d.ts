import type GetImageUseCase from '../application/image/get';
import type TransferImagesUseCase from '../application/image/transfer';
import type * as enums from '../enums';

export interface IImagesUseCase {
  [enums.EControllerActions.Get]: GetImageUseCase;
  [enums.EControllerActions.Transfer]: TransferImagesUseCase;
}

export interface IInnerControllerUseCase {
  [enums.EControllers.Images]: IImagesUseCase;
}

export interface IUseCase<TInput, TOutput> {
  execute(input: TInput): Promise<TOutput>;
}
