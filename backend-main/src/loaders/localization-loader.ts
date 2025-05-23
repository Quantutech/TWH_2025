import ILoader from './abstracts/ILoader';
import Localization from '../services/core/localization';
import Service from '../decorators/service';
import Inject from '../decorators/inject';

@Service()
export class LocalizationLoader implements ILoader {
  constructor(@Inject() private localization: Localization) {}

  public async load(): Promise<void> {
    this.localization.createLocalization();
    this.localization.configureLocalization();
  }

  public async destroy(): Promise<void> {
    // nothing to do here
  }
}
