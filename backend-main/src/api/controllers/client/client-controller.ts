import { plainToInstance } from 'class-transformer';
import { Request } from 'express';
import Inject from '../../../decorators/inject';
import { ClientNotificationDto } from '../../../dtos/client/client-notification.dto';
import { ClientUpdateDTO } from '../../../dtos/client/client-update.dto';
import {
  GetEvaluateDto,
  GiveEvaluateDto,
} from '../../../dtos/client/evaluate.dto';
import { BadRequestError, InternalServerError, NotFoundError } from '../../../errors/custom-errors';
import { Validator } from '../../../middleware/validator';
import { VerifyClient } from '../../../middleware/verify-client';
import ClientService from '../../../services/client';
import EvaluateService from '../../../services/evaluate';
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
import { uploadImageMiddleware } from '../../../middleware/upload-image-middleware';

@Controller('/client')
export default class ClientController extends BaseController {
  constructor(
    @Inject() private readonly clientService: ClientService,
    @Inject() private readonly evaluateService: EvaluateService,
    @Inject() private readonly notificationService: NotificationService
  ) {
    super();
  }

  @Get('/average')
  @Middleware([Validator(GetEvaluateDto, SourceType.Query)])
  public async getEvaluation(req: IRequestWithUser) {
    const { providerId } = req.query;
    const providerIdNum = Number(providerId);

    if (isNaN(providerIdNum)) {
      throw new BadRequestError('Provider ID must be a valid integer');
    }

    return await this.evaluateService.getAvgEvaluation(providerIdNum);
  }

  @Get('/evaluate')
  @Middleware([Validator(GetEvaluateDto, SourceType.Query)])
  public async getAllEvaluations(req: IRequestWithUser) {
    const { providerId } = req.query;
    const providerIdNum = Number(providerId);

    if (isNaN(providerIdNum)) {
      throw new BadRequestError('Provider ID must be a valid integer');
    }

    return await this.evaluateService.getPaginatedEvaluations(
      providerIdNum,
      1,
      10
    );
  }

  @Post('/update')
  @Middleware([VerifyClient(), Validator(ClientUpdateDTO)])
  public async createProvider(req: IRequestWithUser) {
    const { userId } = req.user;

    const provider = await this.clientService.getClientById(userId);

    if (!provider) throw new NotFoundError();

    const data = await this.clientService.updateClient(userId, {
      ...plainToInstance(ClientUpdateDTO, req.body),
    });

    return data;
  }

  @Get('/me')
  @Middleware([VerifyClient()])
  public async getMe(req: IRequestWithUser) {
    const { userId } = req.user;
    const data = await this.clientService.getClientById(userId);

    return data;
  }

  @Get('/profile/:profile_slug')
  @Middleware([emptyMiddleware])
  public async getProvider(req: Request) {
    const { profile_slug } = req.params;
    const data = await this.clientService.getClientBySlug(profile_slug);

    return data;
  }

  @Post('/upload/profile-image')
  @Middleware([VerifyClient(), uploadImageMiddleware])
  public async addImage(req: IRequestWithUser) {
    const { userId } = req.user;
    const imageName = req.body.compressedImageName;
    if (!imageName) throw new InternalServerError();
    await this.clientService.addProfileImage(Number(userId), imageName);
    return {
      message: 'Okay',
    };
  }

  @Post('/evaluate')
  @Middleware([VerifyClient(), Validator(GiveEvaluateDto)])
  public async giveEvaluation(req: IRequestWithUser) {
    const { providerId, rating, suggestion, waitingTime, comment } = req.body;
    const { userId } = req.user;

    if (
      providerId === null ||
      rating === null ||
      suggestion === null ||
      comment === null ||
      waitingTime === null
    ) {
      throw new BadRequestError('Body must be provided!');
    }

    await this.evaluateService.giveEvaluation(
      providerId,
      userId,
      comment,
      rating,
      suggestion,
      waitingTime
    );

    return { message: 'Evaluation submitted successfully' };
  }

  @Get('/notifications')
  @Middleware([
    VerifyClient(),
    Validator(ClientNotificationDto, SourceType.Query),
  ])
  public async getNotifications(req: IRequestWithUser) {
    const { userId } = req.user;
    const { limit, page, keyword, type } = req.query;

    return this.notificationService.getNotificationsByClient(Number(userId), {
      limit: Number(limit),
      page: Number(page),
      keyword: keyword as string,
      type: type as NotificationTypeEnum,
    });
  }

  @Patch('/notification/:id/read')
  @Middleware([VerifyClient()])
  public async markNotificationAsRead(req: IRequestWithUser) {
    const { userId } = req.user;
    const { id } = req.params;
    const notif = await this.notificationService.getNotificationById(
      Number(id)
    );

    if (!notif || notif.clientId !== userId)
      throw new NotFoundError('Notification not found');
    return this.notificationService.markNotificationAsRead(Number(id));
  }
}
