import ILoader from './abstracts/ILoader';
import { LoggerLoader } from './logger-loader';
import DBLoader from './database-loader';
import { WebServerLoader } from './web-server-loader';
import { LocalizationLoader } from './localization-loader';
import Service from '../decorators/service';
import Inject from '../decorators/inject';
import CronLoader from './cron-leader';
import TemplateEngineLoader from './template-engine-loader';
import StateService from '../services/util/address-service';

type Loaders = {
  [key: string]: ILoader;
};

@Service()
export default class ApplicationLoader {
  private loaders: Loaders;

  constructor(
    @Inject() loggerLoader: LoggerLoader,
    @Inject() cronLoader: CronLoader,
    @Inject() localization: LocalizationLoader,
    @Inject() dbLoader: DBLoader,
    @Inject() webServerLoader: WebServerLoader,
    @Inject() templateEngineLoader: TemplateEngineLoader
  ) {
    this.loaders = {
      loggerLoader,
      dbLoader,
      webServerLoader,
      localization,
      cronLoader,
      templateEngineLoader,
    };
  }

  public async loadAll(): Promise<void> {
    for (const loader of Object.values(this.loaders)) {
      await loader.load();
    }
  }

  public async destroyAll(): Promise<void> {
    for (const loader of Object.values(this.loaders)) {
      await loader.destroy();
    }
  }

  public async loadByName(name: string): Promise<void> {
    await this.loaders[name].load();
  }

  public async destroyByName(name: string): Promise<void> {
    await this.loaders[name].destroy();
  }
}
