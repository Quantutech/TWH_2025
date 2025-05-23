import cors from 'cors';
import Express, {
  Application,
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from 'express';
import helmet from 'helmet';
import { Server } from 'http';
import path from 'path';
import 'reflect-metadata';
import container from '../../configs/inversify-config';
import WebServerConfigs from '../../configs/web-server-config';
import HTTPStatuses from '../../consts/http-statuses';
import Inject from '../../decorators/inject';
import Service from '../../decorators/service';
import { responseInterceptor } from '../../middleware/response.interceptor';
import { Error, Route, WebRoute } from '../../types/types';
import ControllerService from './controller';
import Logger from './logger';
import rateLimit from 'express-rate-limit';

@Service()
export class WebServer {
  private expressApp!: Application;
  private server!: Server;
  private readonly routes!: Route[];

  constructor(
    @Inject() private readonly logger: Logger,
    @Inject() private readonly controllerService: ControllerService
  ) {
    this.routes = this.controllerService.getRoutes();
  }

  public createApp() {
    this.logger.info('Creating Express app');
    this.expressApp = Express();
    this.logger.info('Server app created');
  }

  public configureApp() {
    this.expressApp.use(json());
    this.expressApp.use(urlencoded({ extended: true }));
    this.expressApp.use(helmet());

    const limiter = rateLimit({
      windowMs: 60 * 1000, // 1 min
      max: 100,
      message: {
        success: false,
        message: 'Too many request.',
      },
      standardHeaders: false,
      legacyHeaders: false,
    });

    this.expressApp.use(limiter);

    this.expressApp.use((req, res, next) => {
      res.set('Cross-Origin-Resource-Policy', 'cross-site');
      next();
    });
    this.expressApp.use(cors());

    this.expressApp.use(
      '/uploads',
      Express.static(path.join(process.cwd(), 'uploads'))
    );

    this.expressApp.use(responseInterceptor);
  }

  public configureExceptionHandler() {
    this.logger.info('Configuring Express exception handler');
    this.expressApp.use(
      (
        error: Error,
        req: Request,
        res: Response,
        // Next line is required because if it is not present, the function will not be detected as an error handler
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _: NextFunction
      ) => {
        this.logger.fatal(
          `${error.message}, PATH: ${req.path}, STACK: ${error.stack}`
        );
        res.status(error?.statusCode || HTTPStatuses.SERVICE_UNAVAILABLE).json({
          success: false,
          message: error.message,
        });
      }
    );
    this.logger.info('Express exception handler configured');
  }

  public defineBaseRoute() {
    this.expressApp.get('/', (_: Request, res: Response) => {
      const { appName } = WebServerConfigs;
      res.send(appName);
    });
  }

  public startTheServer() {
    this.logger.info('Starting Express server');
    const { port } = WebServerConfigs;
    try {
      this.server = this.expressApp.listen(port, () => {
        this.logger.info(`Express server started on port ${port}`);
      });
    } catch (error) {
      this.onFail(error as Error);
    }
  }

  public prepareRoutes() {
    this.logger.info('Preparing routes');
    this.routes.forEach((route) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const app = this.expressApp as any;
      app[route.method](
        route.path,
        route.preMiddlewares,
        route.postMiddlewares,
        async (req: Request, res: Response, next: NextFunction) => {
          const instance: WebRoute = container.get(route.target);
          try {
            const response = await instance[route.methodName].bind(instance)(
              req,
              res,
              next
            );
            if (response) res.send(response);
          } catch (error) {
            next(error);
          }
        }
      );
    });
    this.logger.info('Routes prepared');
  }

  private onFail(error: Error) {
    this.logger.error(error.message);
  }

  public closeTheServer() {
    this.logger.info('Closing Express server');
    this.server.close();
    this.logger.info('Express server closed');
  }

  public get router() {
    return this.expressApp;
  }
}
