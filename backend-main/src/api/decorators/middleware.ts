/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import BaseController from '../controllers/abstracts/base-controller';

export default function Middleware(middlewares: RequestHandler[]) {
  return function (target: BaseController, propertyKey: string | symbol) {
    Reflect.defineMetadata('preMiddlewares', middlewares, target, propertyKey);
  };
}
