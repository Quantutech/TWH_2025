import { plainToInstance } from 'class-transformer';
import { Response } from 'express';
import Inject from '../../../decorators/inject';
import { AppointmentListDTO } from '../../../dtos/appointment/appointment-list.dto';
import { CancelAppointmentDTO } from '../../../dtos/appointment/cancel-appoitment.dto';
import { CreateAppointmentDTO } from '../../../dtos/appointment/create-appointment.dto';
import { SendReminderDTO } from '../../../dtos/appointment/send-reminder.dto';
import {
  NotFoundError,
  UnauthorizedError,
} from '../../../errors/custom-errors';
import { Validator } from '../../../middleware/validator';
import { VerifyClient } from '../../../middleware/verify-client';
import { VerifyProvider } from '../../../middleware/verify-provider';
import AppointmentService from '../../../services/appointment';
import Handlebars from '../../../services/core/handlebars';
import MailService from '../../../services/mail-service';
import NotificationService from '../../../services/util/notification-service';
import {
  AppointmentStatus,
  NotificationStatusEnum,
  NotificationTypeEnum,
  SourceType,
} from '../../../types/common-types';
import { IRequestWithUser } from '../../../types/types';
import Controller from '../../decorators/controller';
import Get from '../../decorators/get';
import Middleware from '../../decorators/middleware';
import Post from '../../decorators/post';
import { emailLayoutAttachments } from '../../../consts/email-attachments';

@Controller('/appointments')
export default class AppointmentController {
  constructor(
    @Inject() private readonly appointmentService: AppointmentService,
    @Inject() private readonly notificationService: NotificationService,
    @Inject() private readonly handleService: Handlebars,
    @Inject() private readonly mailService: MailService
  ) { }

  @Post('/create')
  @Middleware([VerifyClient(), Validator(CreateAppointmentDTO)])
  public async createAppointment(req: IRequestWithUser, res: Response) {
    const { userId: clientId } = req.user;
    const { slotTime, providerId, insuranceId, reason, appointmentTypeId } =
      plainToInstance(CreateAppointmentDTO, req.body);

    const appointment = await this.appointmentService.createAppointment(
      providerId,
      clientId,
      slotTime,
      reason,
      insuranceId,
      appointmentTypeId
    );

    await this.notificationService.createNotificationClient(
      clientId,
      'New appointment',
      'You have a new appointment scheduled.',
      NotificationTypeEnum.Appointment,
      NotificationStatusEnum.Info
    );

    await this.notificationService.createNotificationProvider(
      providerId,
      'New appointment',
      'You have a new patient.',
      NotificationTypeEnum.Appointment,
      NotificationStatusEnum.Info
    );

    return appointment;
  }

  @Get('/list')
  @Middleware([
    VerifyProvider(),
    Validator(AppointmentListDTO, SourceType.Query),
  ])
  public async getList(req: IRequestWithUser, res: Response) {
    const { limit, page, keyword, status } = req.query;
    const data = await this.appointmentService.getPaginatedList({
      limit: Number(limit),
      page: Number(page),
      keyword,
      providerId: Number(req.user.userId),
      status,
    } as AppointmentListDTO);

    return data;
  }

  @Get('/filled-appointments/:providerId')
  public async getFilledAppointments(req: IRequestWithUser, res: Response) {
    const { providerId } = req.params;

    const data = await this.appointmentService.filledAppointments(
      Number(providerId)
    );

    if (!data) return new NotFoundError('No data found');

    return data;
  }

  @Post('/cancel/provider')
  @Middleware([VerifyProvider(), Validator(CancelAppointmentDTO)])
  public async cancelAppointmentByProvider(req: IRequestWithUser) {
    const { appointmentId, reason } = req.body;
    const providerId = Number(req.user.userId);

    await this.appointmentService.cancelAppointmentByProvider(
      appointmentId,
      providerId,
      reason
    );

    return { message: 'Appointment cancelled by provider.' };
  }

  @Post('/approve/provider')
  @Middleware([VerifyProvider(), Validator(CancelAppointmentDTO)])
  public async approveAppointmentByProvider(req: IRequestWithUser) {
    const { appointmentId, reason } = req.body;
    const providerId = Number(req.user.userId);

    await this.appointmentService.approveAppointmentByProvider(
      appointmentId,
      providerId
    );

    return { message: 'Appointment approved by provider.' };
  }

  @Post('/cancel/client')
  @Middleware([VerifyClient(), Validator(CancelAppointmentDTO)])
  public async cancelAppointmentByClient(req: IRequestWithUser, res: Response) {
    const { appointmentId, reason } = req.body;
    const clientId = Number(req.user.userId);

    await this.appointmentService.cancelAppointmentByClient(
      appointmentId,
      clientId,
      reason
    );

    return { message: 'Appointment cancelled by client.' };
  }

  @Post(':appointmentId/send-reminder')
  @Middleware([VerifyProvider(), Validator(SendReminderDTO)])
  public async sendReminder(req: IRequestWithUser, res: Response) {
    const { appointmentId } = req.params;
    const providerId = Number(req.user.userId);
    const appointment = await this.appointmentService.getProviderById(
      Number(appointmentId)
    );

    if (
      appointment.providerId !== providerId ||
      appointment.status !== AppointmentStatus.Confirmed
    )
      throw new UnauthorizedError();

    const htmlData = await this.handleService.parse('reminder', {
      name: appointment.provider.firstName,
      email: appointment.provider.email
    });
    this.mailService.sendEmail(appointment.client.email, 'Reminder', htmlData);

    return true;
  }

  @Post(':appointmentId/send-note')
  @Middleware([VerifyProvider()])
  public async sendNote(req: IRequestWithUser, res: Response) {
    const { appointmentId } = req.params;
    const providerId = Number(req.user.userId);
    const appointment = await this.appointmentService.getProviderById(
      Number(appointmentId)
    );

    if (
      appointment.providerId !== providerId ||
      appointment.status === AppointmentStatus.Confirmed
    )
      throw new UnauthorizedError();

    const htmlData = await this.handleService.parse('send-note', {
      name: appointment.provider.firstName,
      email: appointment.provider.email
    });
    this.mailService.sendEmail(appointment.client.email, 'Reminder', htmlData, emailLayoutAttachments);

    return true;
  }
}
