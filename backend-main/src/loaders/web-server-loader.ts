import ILoader from './abstracts/ILoader';
import { WebServer } from '../services/core/web-server';
import ControllerService from '../services/core/controller';
import Service from '../decorators/service';
import Inject from '../decorators/inject';

@Service()
export class WebServerLoader implements ILoader {
  constructor(
    @Inject() private webServer: WebServer,
    @Inject() private controller: ControllerService
  ) {}

  public async load(): Promise<void> {
    this.webServer.createApp();
    this.webServer.defineBaseRoute();
    this.webServer.configureApp();
    this.controller.loadAllController();
    this.webServer.prepareRoutes();
    this.webServer.configureExceptionHandler();
    this.webServer.startTheServer();
  }

  public async destroy(): Promise<void> {
    this.webServer.closeTheServer();
  }
}
