import ILoader from './abstracts/ILoader';
import Logger from '../services/core/logger';
import Service from '../decorators/service';
import Inject from '../decorators/inject';

@Service()
export class LoggerLoader implements ILoader {
  constructor(@Inject() private logger: Logger) {}

  public async load(): Promise<void> {
    this.logger.createLogger();
    this.logger.configureLogger();
  }

  public async destroy(): Promise<void> {
    // nothing to do here
  }
}
