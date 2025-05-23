import cron, { ScheduledTask } from 'node-cron';
import Inject from '../../decorators/inject';
import Service from '../../decorators/service';
import Logger from '../core/logger';

@Service()
export default class CronService {
  private tasks: Map<string, ScheduledTask> = new Map();

  constructor(@Inject() private readonly logger: Logger) {}

  public start(schedule: string, job: () => void): void {
    if (this.tasks.has(schedule)) {
      this.logger.info(
        `Cron job for schedule ${schedule} is already running. Stopping the existing job.`
      );
      this.stop(schedule);
    }

    const task = cron.schedule(schedule, async () => {
      await job();
    });

    this.tasks.set(schedule, task);
    this.logger.info(`Cron service is running with schedule: ${schedule}`);
  }

  public stop(schedule: string): void {
    const task = this.tasks.get(schedule);
    if (task) {
      task.stop();
      this.tasks.delete(schedule);
      this.logger.info(`Cron job with schedule ${schedule} stopped`);
    } else {
      this.logger.info(
        `No cron job is currently running for schedule: ${schedule}`
      );
    }
  }

  public stopAll(): void {
    this.tasks.forEach((task, schedule) => {
      task.stop();
      this.logger.info(`Cron job with schedule ${schedule} stopped`);
    });
    this.tasks.clear();
  }
}
