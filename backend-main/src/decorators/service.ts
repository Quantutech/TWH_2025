import { injectable } from 'inversify';
import container from '../configs/inversify-config';
import { Target } from '../types/types';

export enum ScopeEnum {
  SINGLETON = 'singleton',
  TRANSIENT = 'transient',
}

export type ServiceOptions = {
  scope?: ScopeEnum;
};

export default function Service(options: ServiceOptions = {}) {
  const { scope = ScopeEnum.SINGLETON } = options;
  return function (target: Target) {
    injectable()(target);

    if (scope === ScopeEnum.SINGLETON) {
      container.bind(target).to(target).inSingletonScope();
    } else if (options.scope === ScopeEnum.TRANSIENT) {
      container.bind(target).to(target).inTransientScope();
    }
  };
}
