import type * as enums from '../../enums';
import type * as types from '../../types';
import type { Document, Model, FilterQuery } from 'mongoose';

export default abstract class AbstractRepository<T extends Document, U extends Model<T>, Z extends enums.EModules>
  implements types.IGenericRepository<Z>
{
  private readonly _model: U;

  constructor(model: U) {
    this._model = model;
  }

  get model(): U {
    return this._model;
  }

  async get(_id: unknown): Promise<types.IRepositoryGetData[Z] | null> {
    return this.model.findOne({ _id } as FilterQuery<Record<string, unknown>>).lean();
  }

  async add(data: types.IRepositoryAddData[Z]): Promise<string> {
    const newElement = new this.model(data);
    const callback = await newElement.save();
    return callback._id as string;
  }
}
