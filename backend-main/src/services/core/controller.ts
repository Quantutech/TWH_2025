import AdminManagementController from '../../api/controllers/admin/admin-management-controller';
import AdminAuthController from '../../api/controllers/admin/auth-controller';
import AdminClientController from '../../api/controllers/admin/client-management-controller';
import AdminProviderController from '../../api/controllers/admin/provider-management-controller';
import AdminStatController from '../../api/controllers/admin/stat-controller';
import AppointmentController from '../../api/controllers/appointment/appointment-controller';
import ClientAuthController from '../../api/controllers/client/auth-controller';
import ClientController from '../../api/controllers/client/client-controller';
import ProviderAuthController from '../../api/controllers/provider/auth-controller';
import ProviderController from '../../api/controllers/provider/provider-controller';
import NewsletterController from '../../api/controllers/public/newsletter-controller';
import SubscriptionController from '../../api/controllers/subscription/subscription-controller';
import UploadController from '../../api/controllers/upload/upload-controller';
import AddressController from '../../api/controllers/util/address-controller';
import UtilAppointmentTypeController from '../../api/controllers/util/appointment-type-controller';
import UtilInsurance from '../../api/controllers/util/insurances-controller';
import UtilLanguage from '../../api/controllers/util/languages-controller';
import UtilSpecialty from '../../api/controllers/util/specialities-controller';
import UtilsController from '../../api/controllers/util/utils-controller';
import Inject from '../../decorators/inject';
import Service from '../../decorators/service';
import Logger from './logger';

@Service()
export default class ControllerService {
  private controllers = [
    ClientAuthController,
    ProviderAuthController,
    ProviderController,
    UtilLanguage,
    AddressController,
    UtilInsurance,
    UtilSpecialty,
    AppointmentController,
    UtilAppointmentTypeController,
    UtilsController,
    ClientController,
    NewsletterController,
    SubscriptionController,
    AdminAuthController,
    AdminManagementController,
    AdminClientController,
    AdminProviderController,
    AdminStatController,
    UploadController,
  ];

  constructor(@Inject() private readonly logger: Logger) {}

  public getRoutes() {
    return this.controllers.reduce((routes, ctrl) => {
      return routes.concat(Reflect.getMetadata('routes', ctrl.prototype));
    }, []);
  }

  public loadAllController(): void {
    this.logger.info('Controller service is initialized...');
  }
}
