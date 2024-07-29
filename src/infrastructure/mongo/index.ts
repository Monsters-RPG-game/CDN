import mongoose from 'mongoose';
import getConfig from '../../tools/configLoader';
import Log from '../../tools/logger';
import type { ConnectOptions } from 'mongoose';

export default class Mongo {
  async init(): Promise<void> {
    await this.startServer();
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
  }

  private async startServer(): Promise<void> {
    await mongoose.connect(getConfig().mongoURI, {
      dbName: 'Cdn',
    } as ConnectOptions);
    Log.log('Mongo', 'Started server');
  }
}
