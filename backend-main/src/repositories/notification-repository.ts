import { FindOptions, Op, WhereOptions } from 'sequelize';
import Repository from '../decorators/repository';
import Notification from '../models/Notifications';
import { NotificationTypeEnum } from '../types/common-types';
import BaseRepository, { PaginatedResult } from './abstracts/base-repository';


@Repository(Notification)
export class NotificationRepository extends BaseRepository<Notification> {
  public async createNotification(data: Partial<Notification>): Promise<Notification> {
    if (data.clientId && data.providerId) {
      throw new Error('Notification must have either clientId or providerId, not both.');
    }

    if (!data.clientId && !data.providerId) {
      throw new Error('Notification must have either clientId or providerId.');
    }

    return this.create(data);
  }

  public async updateNotification(notificationId: number, data: Partial<Notification>): Promise<boolean> {
    const [affectedRows] = await this.model.update(data, {
      where: { id: notificationId },
    });

    return affectedRows > 0;
  }


  public async getPaginatedNotificationsByClient(
    clientId: number,
    request: { limit: number; page?: number; keyword?: string; type?: NotificationTypeEnum }
  ): Promise<PaginatedResult<Notification>> {
    return this.getPaginatedList({ ...request, clientId });
  }

  public async getPaginatedNotificationsByProvider(
    providerId: number,
    request: { limit: number; page?: number; keyword?: string; type?: NotificationTypeEnum }
  ): Promise<PaginatedResult<Notification>> {
    return this.getPaginatedList({ ...request, providerId });
  }

  public async getNotificationById(id: number): Promise<Notification | null> {
    return this.findOne({ where: { id } });
  }

  public async deleteNotification(id: number): Promise<number> {
    return this.delete({ where: { id } });
  }

  public async getPaginatedList(
    request: { limit: number; page?: number; keyword?: string; type?: NotificationTypeEnum; clientId?: number; providerId?: number }
  ): Promise<PaginatedResult<Notification>> {
    const { limit, page = 1, keyword, type, clientId, providerId } = request;

    const whereClause: WhereOptions = {
      ...(keyword && {
        [Op.or]: [
          { message: { [Op.iLike]: `%${keyword}%` } },
          { header: { [Op.iLike]: `%${keyword}%` } }
        ]
      }),
      ...(type && { type }),
      ...(clientId && { clientId }),
      ...(providerId && { providerId }),
    };

    const options: FindOptions<Notification> = {
      where: whereClause,
      order: [['createdAt', 'DESC']],
    };

    return this.paginate(options, page, limit);
  }
}