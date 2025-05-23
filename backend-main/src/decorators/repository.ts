import { injectable } from 'inversify';
import container from '../configs/inversify-config';
import { Target } from '../types/types';

export default function Repository(model: Target) {
  return function (target: Target) {
    injectable()(target);
    const modelIdentifier = Symbol.for(model);
    container.bind(modelIdentifier).toConstantValue(model);
    container
      .bind(target)
      .toDynamicValue(() => new target(container.get(modelIdentifier)));
  };
}
