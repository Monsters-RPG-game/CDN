import type Mongo from '../infrastructure/mongo';
import type Router from '../shared/router';
import type Bootstrap from '../tools/bootstrap';

export interface IState {
  router: Router;
  controllers: Bootstrap;
  mongo: Mongo;
}

export interface IConfigInterface {
  amqpURI: string;
  mongoURI: string;
}
