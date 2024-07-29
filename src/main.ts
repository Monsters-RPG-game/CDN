import Bootstrap from './bootstrap';
import Mongo from './infrastructure/mongo';
import Router from './presentation/router';
import Log from './tools/logger';
import State from './tools/state';
import type { IFullError } from './types';

class App {
  init(): void {
    this.handleInit().catch((err) => {
      const { stack, message } = err as IFullError;
      Log.error('Server', 'Err while initializing app');
      Log.error('Server', message, stack);
      Log.error('Server', JSON.stringify(err));

      return State.kill().catch((error) =>
        Log.error('Server', "Couldn't kill server", (error as Error).message, (error as Error).stack),
      );
    });
  }

  private async handleInit(): Promise<void> {
    const router = new Router();
    const bootstrap = new Bootstrap();
    const mongo = new Mongo();

    State.router = router;
    State.controllers = bootstrap;
    State.mongo = mongo;

    await mongo.init();
    bootstrap.init();
    router.init();

    Log.log('Server', 'Server started');
  }
}

const app = new App();
app.init();
