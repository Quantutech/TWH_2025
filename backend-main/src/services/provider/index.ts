import { Op, Transaction } from 'sequelize';
import Inject from '../../decorators/inject';
import Service from '../../decorators/service';
import { ProviderDeshboardUpdateDTO } from '../../dtos/provider/provider-dashboard-update.dto';
import { ProviderListDTO } from '../../dtos/provider/provider-list.dto';
import { NotFoundError } from '../../errors/custom-errors';
import Address from '../../models/Address';
import Appointment from '../../models/Appointments';
import AppointmentType from '../../models/AppointmentType';
import Insurance from '../../models/Insurance';
import Language from '../../models/Language';
import ProviderAvailability from '../../models/ProviderAvailabilities';
import Specialty from '../../models/Specialty';
import { AddressRepository } from '../../repositories/addresss-repository';
import ProviderAppointmentTypeRepository from '../../repositories/provider-appointment-type-repository';
import ProviderInsuranceRepository from '../../repositories/provider-insurance-repository';
import ProviderLanguageRepository from '../../repositories/provider-language-repository';
import ProviderRepository from '../../repositories/provider-repository';
import ProviderSpecialityRepository from '../../repositories/provider-spaciality-repository';
import AppointmentService from '../appointment';
import DBService from '../core/database';
import SubscriptionService from '../subscription';

@Service()
export default class ProviderService {
  constructor(
    @Inject()
    private readonly providerRepository: ProviderRepository,
    @Inject()
    private readonly appointmentService: AppointmentService,
    @Inject() private readonly databaseManager: DBService,
    @Inject() private readonly addresRepository: AddressRepository,
    @Inject()
    private readonly providerLanguageRepository: ProviderLanguageRepository,
    @Inject()
    private readonly providerSpecialityRepository: ProviderSpecialityRepository,
    @Inject()
    private readonly providerInsuranceRepository: ProviderInsuranceRepository,
    @Inject()
    private readonly providerAppointmentTypeRepository: ProviderAppointmentTypeRepository,
    @Inject()
    private readonly subscriptionService: SubscriptionService
  ) {}

  public async getPaginatedList(
    data: ProviderListDTO & { isAvailable?: boolean }
  ) {
    const { isAvailable = false, limit = 20, page = 1 } = data;

    const initialLimit = isAvailable ? 100 : limit;

    const paginateData = await this.providerRepository.getPaginatedList({
      ...data,
      limit: initialLimit,
    });

    if (!paginateData.data || paginateData.data.length === 0) {
      throw new NotFoundError('No data found');
    }

    const result = await Promise.all(
      paginateData.data.map(async (provider) => {
        const availability =
          (provider.providerAvailability as unknown as ProviderAvailability[]) ||
          [];

        const availableSlot = await this.getFirstAvailableSlot(
          availability,
          provider.id,
          isAvailable ? 5 : 30
        );

        return {
          ...provider,
          availableSlot,
        };
      })
    );

    let paginatedData: typeof result = result;
    let totalCount = paginateData.meta.totalDocs;
    let totalPages = paginateData.meta.totalPages;

    if (isAvailable) {
      const filteredResult = result.filter((p) => p.availableSlot !== null);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      paginatedData = filteredResult.slice(startIndex, endIndex);
      totalCount = filteredResult.length;
      totalPages = Math.ceil(totalCount / limit);
      if (!totalCount) throw new NotFoundError();
    }

    return {
      ...paginateData,
      data: paginatedData,
      meta: {
        totalDocs: totalCount,
        totalPages,
        page,
        limit,
      },
    };
  }

  public async getAllProviders() {
    return await this.providerRepository.findAll();
  }

  public async deleteProvideById(id: number) {
    return await this.providerRepository.delete({ where: { id } });
  }

  public async getProvider(whereCondition: any) {
    const data: any = await this.providerRepository.findOne({
      where: whereCondition,
      attributes: {
        exclude: ['password', 'verificationCode'],
      },
      include: [
        {
          model: Language,
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
        {
          model: Specialty,
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
        {
          model: Insurance,
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
        { model: Address },
        { model: ProviderAvailability },
        {
          model: AppointmentType,
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
        {
          model: Appointment,
          where: {
            status: 'approved',
          },
          required: false,
        },
      ],
    });

    if (!data) {
      throw new NotFoundError('No data found');
    }
    const providerId = data.id;
    const availability =
      (data.providerAvailability as ProviderAvailability[]) || [];

    const availableSlot = await this.getFirstAvailableSlot(
      availability,
      providerId
    );

    const [subStatus] = await Promise.all([
      this.subscriptionService.getSubscriptionStatus(data.email),
    ]);

    data.isActiveSubscription = !!subStatus;
    data.subscriptionStatus = subStatus;
    data.approvedappointmentscount = data?.appointments.length;
    data.availableSlot = availableSlot;
    delete data.appointments;
    return data;
  }

  public async getProviderById(id: number) {
    return this.getProvider({ id });
  }

  public async getProviderBySlug(profileSlug: string) {
    return this.getProvider({ profileSlug });
  }

  public async updateProvider(
    id: number,
    providerUpdateDTO: ProviderDeshboardUpdateDTO
  ) {
    const {
      phoneNumber,
      country,
      state,
      city,
      zipCode,
      streetAddress,
      lat,
      long,
      ...updateData
    } = providerUpdateDTO;

    const provider = await this.getProviderById(id);

    const transaction: Transaction = await this.databaseManager
      .getConnection()
      .transaction();

    try {
      await this.providerRepository.update(
        {
          where: { id },
        },
        { ...updateData, isProfileComplete: true },
        transaction
      );

      const promises = [];

      if (updateData.languages) {
        const langDelete = this.providerLanguageRepository.delete({
          where: {
            providerId: provider.id,
            languageId: { [Op.notIn]: updateData.languages },
          },
        });

        const langCreate = this.providerLanguageRepository.bulkCreate(
          updateData.languages?.map((languageId) => ({
            providerId: provider.id,
            languageId,
          })),
          { updateOnDuplicate: ['providerId', 'languageId'] }
        );

        promises.push(langDelete, langCreate);
      }

      if (updateData.insurances) {
        const insDelete = this.providerInsuranceRepository.delete({
          where: {
            providerId: provider.id,
            insuranceId: { [Op.notIn]: updateData.insurances },
          },
        });

        const insCreate = this.providerInsuranceRepository.bulkCreate(
          updateData.insurances?.map((insuranceId) => ({
            providerId: provider.id,
            insuranceId,
          })),
          { updateOnDuplicate: ['providerId', 'insuranceId'] }
        );

        promises.push(insDelete, insCreate);
      }

      if (updateData.specialities) {
        const specDelete = this.providerSpecialityRepository.delete({
          where: {
            providerId: provider.id,
            specialtyId: { [Op.notIn]: updateData.specialities },
          },
        });

        const specCreate = this.providerSpecialityRepository.bulkCreate(
          updateData.specialities?.map((specialtyId) => ({
            providerId: provider.id,
            specialtyId,
          })),
          { updateOnDuplicate: ['providerId', 'specialtyId'] }
        );

        promises.push(specDelete, specCreate);
      }

      if (updateData.appointmentTypes) {
        const appTypeDelete = this.providerAppointmentTypeRepository.delete({
          where: {
            providerId: provider.id,
            appointmentTypeId: { [Op.notIn]: updateData.appointmentTypes },
          },
        });

        const appTypeCreate = this.providerAppointmentTypeRepository.bulkCreate(
          updateData.appointmentTypes?.map((appointmentTypeId) => ({
            providerId: provider.id,
            appointmentTypeId,
          })),
          { updateOnDuplicate: ['providerId', 'appointmentTypeId'] }
        );

        promises.push(appTypeDelete, appTypeCreate);
      }

      const addressData = {
        providerId: id,
        country,
        state,
        city,
        zipCode,
        streetAddress,
        lat,
        long,
        phoneNumber,
      };

      if (!provider.address) {
        promises.push(
          this.addresRepository.bulkUpsert(
            [addressData],
            [
              'country',
              'state',
              'city',
              'zipCode',
              'lat',
              'long',
              'streetAddress',
              'phoneNumber',
            ],
            { transaction }
          )
        );
      } else {
        const filteredAddress = Object.fromEntries(
          Object.entries(addressData).filter(
            ([_, value]) => value !== null && value !== undefined
          )
        );

        promises.push(
          this.addresRepository.update(
            { where: { providerId: id } },
            filteredAddress,
            transaction
          )
        );
      }

      await Promise.all(promises);

      await transaction.commit();
      return await this.getProviderById(id);
    } catch (error) {
      await transaction.rollback();
      throw new Error(error as string);
    }
  }

  public async addProfileImage(id: number, fileName: string) {
    const provider = await this.providerRepository.findOne({
      where: { id },
    });

    if (!provider) throw new NotFoundError();

    try {
      await this.providerRepository.update(
        {
          where: { id },
        },
        { profileImageUrl: fileName }
      );
      return { success: true };
    } catch (error) {
      throw new Error(error as string);
    }
  }

  public async addVideoIntroUrl(id: number, fileName: string) {
    const provider = await this.providerRepository.findOne({
      where: { id },
    });

    if (!provider) throw new NotFoundError();

    try {
      await this.providerRepository.update(
        {
          where: { id },
        },
        { videoIntroUrl: fileName }
      );
      return { success: true };
    } catch (error) {
      throw new Error(error as string);
    }
  }

  private async getFirstAvailableSlot(
    availability: ProviderAvailability[],
    providerId: number,
    searchRange: number = 30
  ): Promise<string | null> {
    const allBooked = await this.appointmentService.filledAppointments(
      providerId
    );

    if (!Array.isArray(allBooked)) return null;

    const booked = allBooked.map((b) => new Date(b.slotTime).toISOString());
    const today = new Date();

    for (let i = 0; i < searchRange; i++) {
      const checkDate = new Date();
      checkDate.setDate(today.getDate() + i);

      const weekDay = checkDate
        .toLocaleDateString('en-US', { weekday: 'long' })
        .toLowerCase();

      const rule = availability.find((a) => a.dayOfWeek === weekDay);
      if (!rule) continue;

      const [startHour, startMinute] = rule.startTime.split(':').map(Number);
      const [endHour, endMinute] = rule.endTime.split(':').map(Number);

      let currentSlot = new Date(checkDate);
      currentSlot.setUTCHours(startHour, startMinute, 0, 0);

      const endDate = new Date(checkDate);
      endDate.setUTCHours(endHour, endMinute, 0, 0);

      while (currentSlot < endDate) {
        const isoSlot = currentSlot.toISOString();

        if (currentSlot > today && !booked.includes(isoSlot)) {
          return isoSlot;
        }

        currentSlot.setMinutes(currentSlot.getMinutes() + 30);
      }
    }

    return null;
  }

  public async checkAndUpdateProviderSubscription() {
    const PAGE_SIZE = 50;
    let page = 0;
    let hasMore = true;

    while (hasMore) {
      const { data: providers, meta } =
        await this.providerRepository.getPaginatedListWithoutQuery(
          PAGE_SIZE,
          page * PAGE_SIZE
        );

      if (!providers || providers.length === 0) {
        break;
      }

      for (const provider of providers) {
        try {
          const [hasSub] = await Promise.all([
            this.subscriptionService.getSubscriptionStatus(provider.email),
          ]);

          await this.providerRepository.update(provider.id, {
            isActiveSubscription: !!hasSub,
            updatedAt: new Date(),
          });
        } catch (err) {
          console.error(
            `Failed to update subscription for provider ID ${provider.id}:`,
            err
          );
        }
      }

      page++;
      hasMore = page * PAGE_SIZE < meta.totalDocs;
    }
  }
}
