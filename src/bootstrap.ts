import ImagesController from './presentation/controllers/images';
import Log from '../src/tools/logger';

export default class Bootstrap {
  private _images: ImagesController | null = null;

  get images(): ImagesController {
    return this._images!;
  }

  init(): void {
    this._images = new ImagesController();

    this.images.init();
  }

  close(): void {
    Log.log('Bootstrap', 'Closing');
  }
}
