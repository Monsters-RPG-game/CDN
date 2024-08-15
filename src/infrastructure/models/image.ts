import mongoose from 'mongoose';
import type { IImage } from '../../domain/image/types';

export const imageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name not provided'],
  },
  path: {
    type: String,
    required: [true, 'Path not provided'],
  },
  filename: {
    type: String,
    required: [true, 'Filename not provided'],
  },
});

const Image = mongoose.model<IImage>('Image', imageSchema);
export default Image;
