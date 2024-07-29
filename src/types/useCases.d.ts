import type AddImagesUseCase from '../application/image/create';
import type GetImageUseCase from '../application/image/get';
import type * as enums from '../enums';

export interface IImagesUseCase {
  [enums.EControllerActions.Get]: GetImageUseCase;
  [enums.EControllerActions.Add]: AddImagesUseCase;
}

export interface IInnerControllerUseCase {
  [enums.EControllers.Images]: IImagesUseCase;
}

export interface IUseCase<TInput, TOutput> {
  execute(input: TInput): Promise<TOutput>;
}
