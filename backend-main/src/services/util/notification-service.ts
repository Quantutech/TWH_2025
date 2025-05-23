import Service from '../../decorators/service';
import Inject from '../../decorators/inject';
import { NotificationRepository } from '../../repositories/notification-repository';
import { NotificationStatusEnum, NotificationTypeEnum } from '../../types/common-types';
import { PaginatedResult } from '../../repositories/abstracts/base-repository';
import Notification from '../../models/Notifications';
import { Op } from 'sequelize';
import { NotFoundError } from '../../errors/custom-errors';


@Service()
export default class NotificationService {
  constructor(
    @Inject() private readonly notificationRepository: NotificationRepository,
  ) {
  }

  public async createNotificationClient(
    clientId: number,
    header: string,
    message: string,
    type: NotificationTypeEnum,
    status: NotificationStatusEnum,
    actionUrl?: string,
  ): Promise<Notification> {
    return this.notificationRepository.createNotification({
      clientId,
      header,
      message,
      type,
      status,
      actionUrl,
    });
  }

  public async createNotificationProvider(
    providerId: number,
    header: string,
    message: string,
    type: NotificationTypeEnum,
    status: NotificationStatusEnum,
    actionUrl?: string,
  ): Promise<Notification> {
    return this.notificationRepository.createNotification({
      providerId,
      header,
      message,
      type,
      status,
      actionUrl,
    });
  }

  public async markNotificationAsRead(notificationId: number): Promise<boolean> {
    const updated = await this.notificationRepository.updateNotification(notificationId, { isRead: true });

    if (!updated) {
      throw new Error('Notification not found or could not be updated');
    }

    return true;
  }

  public async getNotificationsByClient(
    clientId: number,
    request: { limit: number; page?: number; keyword?: string; type?: NotificationTypeEnum },
  ): Promise<PaginatedResult<Notification>> {
    const notification = await this.notificationRepository.getPaginatedNotificationsByClient(clientId, request);

    if (!notification.data.length) {
      throw new NotFoundError()
    }
    return notification
  }

  public async getNotificationsByProvider(
    providerId: number,
    request: { limit: number; page?: number; keyword?: string; type?: NotificationTypeEnum },
  ): Promise<PaginatedResult<Notification>> {
    const notification = await this.notificationRepository.getPaginatedNotificationsByProvider(providerId, request);
    if (!notification.data.length) {
      throw new NotFoundError()
    }
    return notification
  }


  public async getNotificationById(id: number): Promise<Notification | null> {
    return this.notificationRepository.getNotificationById(id);
  }

  public async getPaginatedNotifications(
    limit: number,
    page?: number,
    keyword?: string,
    type?: NotificationTypeEnum,
  ): Promise<PaginatedResult<Notification>> {
    return this.notificationRepository.getPaginatedList({ limit, page, keyword, type });
  }
}