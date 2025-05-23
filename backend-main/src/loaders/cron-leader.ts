import { CronTime } from '../consts/cron';
import Inject from '../decorators/inject';
import Service from '../decorators/service';
import AppointmentService from '../services/appointment';
import CronService from '../services/cron';
import ProviderService from '../services/provider';
import ILoader from './abstracts/ILoader';

@Service()
export default class CronLoader implements ILoader {
  constructor(
    @Inject() private readonly cronService: CronService,
    @Inject() private readonly providerService: ProviderService,
    @Inject() private readonly appointmentService: AppointmentService,
  ) { }

  public async load(): Promise<void> {
    this.cronService.start(
      CronTime.everyFifteenMinutes,
      this.appointmentService.approveAppointmentsCron.bind(this.appointmentService)
    );

    this.cronService.start(
      CronTime.everyFiveMinutes,
      this.providerService.checkAndUpdateProviderSubscription.bind(this.providerService)
    );
  }

  public async destroy(): Promise<void> {
    this.cronService.stopAll();
  }
}
