import Log from './logger';
import type Bootstrap from '../bootstrap';
import type Mongo from '../infrastructure/mongo';
import type Router from '../presentation/router';
import type { IState } from '../types';

class State implements IState {
  private _router: Router | null = null;
  private _controllers: Bootstrap | null = null;
  private _mongo: Mongo | null = null;

  get router(): Router {
    return this._router!;
  }

  set router(value: Router) {
    this._router = value;
  }

  get controllers(): Bootstrap {
    return this._controllers!;
  }

  set controllers(val: Bootstrap) {
    this._controllers = val;
  }

  get mongo(): Mongo {
    return this._mongo!;
  }

  set mongo(value: Mongo) {
    this._mongo = value;
  }

  async kill(): Promise<void> {
    return new Promise((resolve) => {
      this.router.close();
      this.controllers.close();
      Log.log('Server', 'Server closed');

      resolve();
    });
  }
}

export default new State();
