import { Op, Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import Inject from '../../decorators/inject';
import Service from '../../decorators/service';
import { AppointmentListDTO } from '../../dtos/appointment/appointment-list.dto';
import { BadRequestError, InternalServerError, NotFoundError } from '../../errors/custom-errors';
import AppointmentType from '../../models/AppointmentType';
import Client from '../../models/Client';
import Provider from '../../models/Provider';
import AppointmentRepository from '../../repositories/appointment-repository';
import ProviderAppointmentTypeRepository from '../../repositories/provider-appointment-type-repository';
import ProviderAvailabilityRepository from '../../repositories/provider-availabilities-repository';
import ProviderRepository from '../../repositories/provider-repository';
import { AppointmentStatus, AppointmentTypeEnum, DateRange } from '../../types/common-types';
import DBService from '../core/database';

@Service()
export default class AppointmentService {
  constructor(
    @Inject()
    private readonly providerAvailabilityRepository: ProviderAvailabilityRepository,
    @Inject() private readonly appointmentRepository: AppointmentRepository,
    @Inject() private readonly databaseManager: DBService,
    @Inject()
    private readonly providerRepository: ProviderRepository,
    @Inject()
    private readonly providerAppointmentTypeRepository: ProviderAppointmentTypeRepository,
  ) { }

  public async getProviderById(providerId: number) {
    const provider = await this.appointmentRepository.findOne({
      where: { id: providerId },
      include: [Client, Provider],
    });
    if (!provider) throw new NotFoundError();

    return provider;
  }

  public async setProviderAvailability(providerId: number, data: any) {
    const transaction: Transaction = await this.databaseManager
      .getConnection()
      .transaction();

    try {
      const provider = await this.providerRepository.findById(providerId);
      if (!provider) throw new NotFoundError();

      await this.providerAvailabilityRepository.delete({
        where: { providerId },
      });
      if (data.length) {
        await this.providerAvailabilityRepository.bulkCreate(
          data?.map((slot: any) => ({ providerId, ...slot }))
        );
      }


      await transaction.commit();
      return true;
    } catch (error) {
      await transaction.rollback();
      throw new InternalServerError(error as string);
    }
  }

  public async isSlotAvailable(
    providerId: number,
    slotTime: Date
  ): Promise<boolean> {
    const slotDate = new Date(slotTime);
    const dayOfWeek = slotDate
      .toLocaleString('en-US', {
        weekday: 'long',
        timeZone: 'UTC',
      })
      .toLowerCase();
    const providerAvailability =
      await this.providerAvailabilityRepository.findOne({
        where: {
          providerId: providerId,
          dayOfWeek: dayOfWeek,
        },
      });

    if (!providerAvailability) {
      return false;
    }

    if (slotDate < new Date()) {
      return false;
    }

    const { startTime, endTime } = providerAvailability;
    const slotHour = slotDate.getUTCHours();
    const slotMinute = slotDate.getUTCMinutes();

    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    if (
      slotHour < startHour ||
      (slotHour === startHour && slotMinute < startMinute) ||
      slotHour > endHour ||
      (slotHour === endHour && slotMinute >= endMinute)
    ) {
      return false;
    }

    const interval = 30;

    if (slotDate.getUTCMinutes() % interval !== 0) {
      return false;
    }

    const existingAppointment = await this.appointmentRepository.findOne({
      where: {
        providerId: providerId,
        status: AppointmentStatus.Confirmed,
        slotTime: slotDate,
      },
    });

    if (existingAppointment) {
      return false;
    }

    return true;
  }

  public async createAppointment(
    providerId: number,
    clientId: number,
    slotTime: Date,
    reason?: string,
    insuranceId?: number,
    appointmentMode?: number
  ) {
    const provider = await this.providerRepository.findById(providerId);
    if (!provider || provider.appointmentCalendarType === "external") {
      throw new NotFoundError();
    }

    const availability = await this.isSlotAvailable(providerId, slotTime);
    if (!availability) {
      throw new Error("The selected time slot is not available.");
    }

    const targetType: AppointmentTypeEnum = appointmentMode === 1
      ? AppointmentTypeEnum.InPerson
      : AppointmentTypeEnum.Online;

    const providerTypes = await this.providerAppointmentTypeRepository.findAll({
      where: { providerId },
      include: [AppointmentType],
    });

    const matchingType = providerTypes.find(
      (pt) => pt.appointmenType?.type === targetType
    );

    if (!matchingType) {
      throw new BadRequestError(
        `This provider does not offer ${targetType} appointments.`
      );
    }

    return await this.appointmentRepository.create({
      providerId,
      clientId,
      slotTime,
      status: AppointmentStatus.Confirmed,
      reason,
      insuranceId,
      appointmentTypeId: matchingType.appointmentTypeId,
    });
  }


  public async getPaginatedList({
    limit,
    page,
    keyword,
    providerId,
    status,
  }: AppointmentListDTO) {
    const paginateData = await this.appointmentRepository.getPaginatedList({
      limit,
      page,
      keyword,
      providerId,
      status,
    });

    if (!paginateData.data || paginateData.data.length === 0) {
      throw new NotFoundError('No data found');
    }

    return paginateData;
  }

  public async filledAppointments(providerId: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const data = await this.appointmentRepository.findAll({
      where: {
        providerId,
        status: AppointmentStatus.Confirmed,
        slotTime: {
          [Op.gte]: today,
        },
      },
      attributes: ['id', 'slotTime'],
    });

    if (!data || data.length === 0) {
      return false;
    }

    return data;
  }

  public async cancelAppointmentByProvider(
    appointmentId: number,
    providerId: number,
    reason: string
  ) {
    try {
      const appointment = await this.appointmentRepository.findOne({
        where: { id: appointmentId, providerId },
      });

      if (!appointment) {
        throw new NotFoundError(
          'Appointment not found or does not belong to this provider.'
        );
      }

      await this.appointmentRepository.update(
        {
          where: {
            id: appointmentId,
          },
        },
        { status: AppointmentStatus.Cancelled, reason: reason ?? 'Cancelled' }
      );

      return true;
    } catch (error) {
      throw new InternalServerError(error as string);
    }
  }

  public async approveAppointmentByProvider(
    appointmentId: number,
    providerId: number
  ) {
    try {
      const appointment = await this.appointmentRepository.findOne({
        where: { id: appointmentId, providerId },
      });

      if (!appointment) {
        throw new NotFoundError(
          'Appointment not found or does not belong to this provider.'
        );
      }

      await this.appointmentRepository.update(
        {
          where: {
            id: appointmentId,
          },
        },
        { status: AppointmentStatus.Cancelled }
      );

      return true;
    } catch (error) {
      throw new InternalServerError(error as string);
    }
  }

  public async approveAppointmentsCron() {
    try {
      const currentDate = new Date();

      const appointments = await this.appointmentRepository.findAll({
        where: {
          status: { [Op.ne]: AppointmentStatus.Approved },
          slotTime: { [Op.lte]: currentDate },
        },
      });

      if (appointments.length === 0) {
        return false;
      }

      for (const appointment of appointments) {
        await this.appointmentRepository.update(
          {
            where: {
              id: appointment.id,
            },
          },
          {
            status: AppointmentStatus.Approved,
          }
        );
      }

      return true;
    } catch (error) {
      throw new InternalServerError(error as string);
    }
  }

  public async cancelAppointmentByClient(
    appointmentId: number,
    clientId: number,
    reason: string
  ) {
    try {
      const appointment = await this.appointmentRepository.findOne({
        where: { id: appointmentId, clientId },
      });

      if (!appointment) {
        throw new NotFoundError(
          'Appointment not found or does not belong to this client.'
        );
      }

      await this.appointmentRepository.update(
        {
          where: {
            id: appointmentId,
          },
        },
        { status: AppointmentStatus.Cancelled, reason: reason ?? 'Cancelled' }
      );

      return true;
    } catch (error) {
      throw new InternalServerError(error as string);
    }
  }

  public async getAppointmentStats(providerId: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const total = await this.appointmentRepository.count({
      where: { providerId }
    });

    const todayAppointments = await this.appointmentRepository.count({
      where: {
        providerId,
        slotTime: {
          $gte: today,
          $lt: tomorrow
        }
      }
    });

    const completed = await this.appointmentRepository.count({
      where: {
        providerId,
        status: AppointmentStatus.Approved
      }
    });

    const canceled = await this.appointmentRepository.count({
      where: {
        providerId,
        status: AppointmentStatus.Cancelled
      }
    });

    return {
      total,
      today: todayAppointments,
      completed,
      canceled,
    };
  }

  public async getAppointmentStatsByTypeAndRange(
    providerId: number,
    range: DateRange
  ): Promise<{ online: number; inperson: number }> {
    const now = new Date();
    let startDate: Date;

    switch (range) {
      case DateRange.DAILY:
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case DateRange.WEEKLY:
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        break;
      case DateRange.MONTHLY:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case DateRange.YEARLY:
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(0);
    }
    console.log(startDate)
    const online = await this.appointmentRepository.count({
      where: {
        providerId,
        appointmentTypeId: 1, //online
        slotTime: { [Op.gte]: startDate }
      }
    });

    const inperson = await this.appointmentRepository.count({
      where: {
        providerId,
        appointmentTypeId: 2, //in-oerson
        slotTime: { [Op.gte]: startDate }
      }
    });

    return { online, inperson };
  }

  public async getPeakTimes(providerId: number, range: DateRange) {
    const now = new Date();
    let startDate: Date;

    switch (range) {
      case DateRange.DAILY:
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case DateRange.WEEKLY:
        startDate = new Date();
        startDate.setDate(now.getDate() - 7);
        break;
      case DateRange.MONTHLY:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case DateRange.YEARLY:
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(0);
    }

    const results = await this.appointmentRepository.findAll({
      attributes: [
        [Sequelize.fn('TO_CHAR', Sequelize.col('slot_time'), 'Day'), 'day'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'appointment_count'],
      ],
      where: {
        providerId,
        slotTime: { [Op.gte]: startDate }
      },
      group: [Sequelize.fn('TO_CHAR', Sequelize.col('slot_time'), 'Day')],
    });

    return results;
  }
}
