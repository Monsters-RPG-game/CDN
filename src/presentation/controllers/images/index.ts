import CreateImageController from './create';
import GetImageController from './get';
import { CreateImageUseCase } from '../../../application/createImageUseCase';
import { GetImageUseCase } from '../../../application/getImage';
import InMemoryImageRepository from '../../../infrastructure/inMemoryImageRepository';
import type express from 'express';

export default class ImagesController {
  private _getImage: GetImageController | null = null;
  private _createImage: CreateImageController | null = null;

  get getImage(): (req: express.Request, res: express.Response) => Promise<void> {
    return (req: express.Request, res: express.Response) => this._getImage!.handle(req, res);
  }

  get createImage(): (req: express.Request, res: express.Response) => Promise<void> {
    return (req: express.Request, res: express.Response) => this._createImage!.handle(req, res);
  }

  init(): void {
    this.initImages();
  }

  private initImages(): void {
    const repo = new InMemoryImageRepository();

    this._getImage = new GetImageController(new GetImageUseCase(repo));
    this._createImage = new CreateImageController(new CreateImageUseCase(repo));
  }
}
