import CreateRouter from './create/router';
import GetRouter from './get/router';
import type { Router } from 'express';

const initUserRoutes = (router: Router): void => {
  const prefix = '/images';

  router.use(prefix, new GetRouter().router).use(prefix, new CreateRouter().router);
};

export default initUserRoutes;
