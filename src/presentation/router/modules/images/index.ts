import GetRouter from './get/router';
import TransferRouter from './transfer/router';
import type { Router } from 'express';

const initUserRoutes = (router: Router): void => {
  const prefix = '/images';

  router.use(prefix, new GetRouter().router).use(prefix, new TransferRouter().router);
};

export default initUserRoutes;
