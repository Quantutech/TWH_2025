import { createPath } from '../../utils';
import BaseController from '../controllers/abstracts/base-controller';

export default function Delete(path?: string) {
  return function (target: BaseController, key: string) {
    const routePath = createPath(path) ?? createPath(key);

    Reflect.defineMetadata('path', routePath, target, key);
    Reflect.defineMetadata('method', 'delete', target, key);
  };
}
