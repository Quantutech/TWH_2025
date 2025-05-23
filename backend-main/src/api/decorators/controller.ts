import { RequestHandler } from 'express';
import Service from '../../decorators/service';
import { Target } from '../../types/types';
import { emptyMiddleware } from '../../utils';

export default function Controller(
  prefix: string,
  controllerMiddlewares: RequestHandler[] = []
) {
  return function (target: Target) {
    Service()(target);

    const routes = [];

    for (const value of Object.getOwnPropertyNames(target.prototype)) {
      const path = Reflect.getMetadata('path', target.prototype, value);
      const method = Reflect.getMetadata('method', target.prototype, value);
      const routePath = path === 'constructor' ? prefix : `${prefix}${path}`;

      const preMiddlewares: RequestHandler[] = Reflect.getMetadata(
        'preMiddlewares',
        target.prototype,
        value
      ) || [emptyMiddleware];
      const postMiddlewares: RequestHandler[] = Reflect.getMetadata(
        'postMiddlewares',
        target.prototype,
        value
      ) || [emptyMiddleware];
      if (path) {
        routes.push({
          path: routePath,
          methodName: value,
          method,
          target,
          preMiddlewares: [...controllerMiddlewares, ...preMiddlewares],
          postMiddlewares,
        });
      }
    }

    Reflect.defineMetadata('routes', routes, target.prototype);
  };
}
