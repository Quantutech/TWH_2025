import { plainToInstance } from 'class-transformer';
import { Request } from 'express';
import Inject from '../../../decorators/inject';
import { ProviderDashboardAppointmentTypeDTO } from '../../../dtos/provider/dashboard-appointment-type.dto';
import { ProviderAvailabilityDTO } from '../../../dtos/provider/provider-availability.dto';
import { ProviderDeshboardUpdateDTO } from '../../../dtos/provider/provider-dashboard-update.dto';
import { ProviderListDTO } from '../../../dtos/provider/provider-list.dto';
import { ProviderNotificationDto } from '../../../dtos/provider/provider-notification.dto';
import { ProviderUpdateDTO } from '../../../dtos/provider/provider-update.dto';
import {
  InternalServerError,
  NotFoundError,
} from '../../../errors/custom-errors';
import { uploadImageMiddleware } from '../../../middleware/upload-image-middleware';
import { uploadMp4Middleware } from '../../../middleware/upload-mp4-middleware';
import { Validator } from '../../../middleware/validator';
import { VerifyProvider } from '../../../middleware/verify-provider';
import AppointmentService from '../../../services/appointment';
import ProviderService from '../../../services/provider';
import NotificationService from '../../../services/util/notification-service';
import { NotificationTypeEnum, SourceType } from '../../../types/common-types';
import { IRequestWithUser } from '../../../types/types';
import { emptyMiddleware } from '../../../utils';
import Controller from '../../decorators/controller';
import Get from '../../decorators/get';
import Middleware from '../../decorators/middleware';
import Patch from '../../decorators/patch';
import Post from '../../decorators/post';
import BaseController from '../abstracts/base-controller';

@Controller('/provider')
export default class ProviderController extends BaseController {
  constructor(
    @Inject() private readonly providerService: ProviderService,
    @Inject() private readonly appointmentService: AppointmentService,
    @Inject() private readonly notificationService: NotificationService
  ) {
    super();
  }

  @Get('/list')
  @Middleware([Validator(ProviderListDTO, SourceType.Query)])
  public async getList(req: Request) {
    const {
      limit,
      page,
      keyword,
      languages,
      specialities,
      insurances,
      dayOfWeek,
      state,
      gender,
      sort,
      lat,
      long,
      appointmentType,
      isAvailable
    } = plainToInstance(ProviderListDTO, req.query);

    const queryParams: ProviderListDTO = {
      limit,
      page,
      keyword,
      languages,
      specialities,
      dayOfWeek,
      insurances,
      state,
      gender,
      lat,
      long,
      sort,
      appointmentType,
      isAvailable
    };
    return await this.providerService.getPaginatedList(queryParams);
  }

  @Get('/me')
  @Middleware([VerifyProvider()])
  public async getMe(req: IRequestWithUser) {
    const { userId } = req.user;
    return await this.providerService.getProviderById(userId);
  }

  @Get('/profile/:profile_slug')
  @Middleware([emptyMiddleware])
  public async getProvider(req: Request) {
    const { profile_slug } = req.params;
    const data = await this.providerService.getProviderBySlug(profile_slug);

    return data;
  }

  @Post('/update-dashboard')
  @Middleware([VerifyProvider(), Validator(ProviderDeshboardUpdateDTO)])
  public async updateDashboard(req: IRequestWithUser) {
    const { userId } = req.user;

    const provider = await this.providerService.getProviderById(userId);

    if (!provider) throw new NotFoundError();

    const data = await this.providerService.updateProvider(userId, {
      ...plainToInstance(ProviderDeshboardUpdateDTO, req.body),
    });

    if (req.body?.workingHours) {
      await this.appointmentService.setProviderAvailability(
        req.user.userId,
        req.body?.workingHours as unknown as ProviderAvailabilityDTO
      );
    }
    return data;
  }

  @Post('/update')
  @Middleware([VerifyProvider(), Validator(ProviderUpdateDTO)])
  public async createProvider(req: IRequestWithUser) {
    const { userId } = req.user;

    const provider = await this.providerService.getProviderById(userId);

    if (!provider) throw new NotFoundError();

    const data = await this.providerService.updateProvider(userId, {
      ...plainToInstance(ProviderUpdateDTO, req.body),
    });

    if (req.body?.workingHours) {
      await this.appointmentService.setProviderAvailability(
        req.user.userId,
        req.body.workingHours as unknown as ProviderAvailabilityDTO
      );
    }
    return data;
  }

  @Post('/upload/profile-image')
  @Middleware([VerifyProvider(), uploadImageMiddleware])
  public async addImage(req: IRequestWithUser) {
    const { userId } = req.user;
    const imageName = req.body.compressedImageName;
    if (!imageName) throw new InternalServerError();
    await this.providerService.addProfileImage(Number(userId), imageName);
    return {
      message: 'Okay',
    };
  }

  @Post('/upload/profile-video-intro')
  @Middleware([VerifyProvider(), uploadMp4Middleware])
  public async addVideoIntroUrl(req: IRequestWithUser) {
    const { userId } = req.user;
    const name = req.body?.videoFileName;
    if (!name) throw new InternalServerError();
    await this.providerService.addVideoIntroUrl(Number(userId), name);
    return {
      message: 'Okay',
    };
  }

  @Post('/set-availability')
  @Middleware([VerifyProvider(), Validator(ProviderAvailabilityDTO)])
  public async setProviderAvailability(req: IRequestWithUser, res: Response) {
    const data = plainToInstance(ProviderAvailabilityDTO, req.body);

    await this.appointmentService.setProviderAvailability(
      req.user.userId,
      data
    );

    return {
      message: 'Okay',
    };
  }

  @Get('/notifications')
  @Middleware([
    VerifyProvider(),
    Validator(ProviderNotificationDto, SourceType.Query),
  ])
  public async getNotifications(req: IRequestWithUser) {
    const { userId } = req.user;
    const { limit, page, keyword, type } = req.query;

    return this.notificationService.getNotificationsByProvider(Number(userId), {
      limit: Number(limit),
      page: Number(page),
      keyword: keyword as string,
      type: type as NotificationTypeEnum,
    });
  }

  @Patch('/notification/:id/read')
  @Middleware([VerifyProvider()])
  public async markNotificationAsRead(req: IRequestWithUser) {
    const { userId } = req.user;
    const { id } = req.params;
    const notif = await this.notificationService.getNotificationById(
      Number(id)
    );
    if (!notif || notif.providerId !== userId)
      throw new NotFoundError('Notification not found');
    return this.notificationService.markNotificationAsRead(Number(id));
  }

  @Get('/dashboard/appointment-stats')
  @Middleware([VerifyProvider()])
  public async getAppointmentStats(req: IRequestWithUser) {
    const { userId } = req.user;

    return this.appointmentService.getAppointmentStats(Number(userId));
  }

  @Get('/dashboard/appointment-type-stats')
  @Middleware([
    VerifyProvider(),
    Validator(ProviderDashboardAppointmentTypeDTO, SourceType.Query),
  ])
  public async getAppointmentStatsByTypeAndRange(req: IRequestWithUser) {
    const { userId } = req.user;
    const { type } = plainToInstance(
      ProviderDashboardAppointmentTypeDTO,
      req.query
    );
    return this.appointmentService.getAppointmentStatsByTypeAndRange(
      Number(userId),
      type
    );
  }

  @Get('/dashboard/appointment-peak-times-stats')
  @Middleware([
    VerifyProvider(),
    Validator(ProviderDashboardAppointmentTypeDTO, SourceType.Query),
  ])
  public async getPeakTimes(req: IRequestWithUser) {
    const { userId } = req.user;
    const { type } = plainToInstance(
      ProviderDashboardAppointmentTypeDTO,
      req.query
    );
    return this.appointmentService.getPeakTimes(Number(userId), type);
  }
}
