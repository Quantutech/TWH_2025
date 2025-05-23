import Inject from '../decorators/inject';
import Service from '../decorators/service';
import DBService from '../services/core/database';
import ILoader from './abstracts/ILoader';
@Service()
export default class DatabaseLoader implements ILoader {
  constructor(@Inject() private dbService: DBService) { }

  public async load(): Promise<void> {
    await this.dbService.connect();
    await this.dbService.sync();
  }

  public async destroy(): Promise<void> {
    this.dbService.disconnect();
  }
}
