import type mongoose from 'mongoose';

export interface IImageEntity {
  name: string;
}

export interface IImage extends IImageEntity, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}
