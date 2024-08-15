import type mongoose from 'mongoose';

export interface IImageEntity {
  _id?: string;
  name: string;
  path: string;
}

export interface IImage extends IImageEntity, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}
