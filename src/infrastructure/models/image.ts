import mongoose from 'mongoose';
import type { IImage } from '../../domain/image/types';

export const imageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name not provided'],
  },
});

const Image = mongoose.model<IImage>('Image', imageSchema);
export default Image;
