import { inject } from 'inversify';
import { Target } from '../types/types';

export default function Inject() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return function (target: Target, name?: string, index?: number) {
    inject(target.name);
  };
}
