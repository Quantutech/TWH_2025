import { Transaction } from 'sequelize';
import Inject from '../../decorators/inject';
import Service from '../../decorators/service';
import { ClientUpdateDTO } from '../../dtos/client/client-update.dto';
import { NotFoundError } from '../../errors/custom-errors';
import Address from '../../models/Address';
import { AddressRepository } from '../../repositories/addresss-repository';
import ClientRepository from '../../repositories/client-repository';
import DBService from '../core/database';

@Service()
export default class ClientService {
  constructor(
    @Inject()
    private readonly clientRepository: ClientRepository,
    @Inject() private readonly databaseManager: DBService,
    @Inject() private readonly addresRepository: AddressRepository
  ) {}

  public async getClientById(id: number) {
    return this.clientRepository.findOne({ where: { id } });
  }

  public async getClients() {
    return this.clientRepository.findAll();
  }

  public async getClientBySlug(profileSlug: string) {
    return this.getClient({ profileSlug });
  }

  public async getClient(whereCondition: any) {
    const data: any = await this.clientRepository.findOne({
      where: whereCondition,
      attributes: {
        exclude: ['password', 'verificationCode'],
      },
      include: [{ model: Address }],
    });

    if (!data) {
      throw new NotFoundError('No data found');
    }

    return data;
  }

  public async updateClient(id: number, clientrUpdateDTO: ClientUpdateDTO) {
    const {
      phoneNumber,
      country,
      state,
      city,
      zipCode,
      lat,
      long,
      ...updateData
    } = clientrUpdateDTO;

    const client = await this.getClientById(id);
    if (!client) {
      throw new NotFoundError('Not found user!');
    }

    const transaction: Transaction = await this.databaseManager
      .getConnection()
      .transaction();

    try {
      await this.clientRepository.update(
        {
          where: { id },
        },
        { ...updateData },
        transaction
      );

      const promises = [];

      const addressData = {
        clientId: client.id,
        country,
        state,
        city,
        zipCode,
        lat,
        long,
        phoneNumber,
      };

      if (!client.address) {
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
            { where: { clientId: id } },
            filteredAddress,
            transaction
          )
        );
      }

      await Promise.all(promises);

      await transaction.commit();
      return await this.getClientById(id);
    } catch (error) {
      await transaction.rollback();
      throw new Error(error as string);
    }
  }

  public async addProfileImage(id: number, fileName: string) {
    const client = await this.clientRepository.findOne({
      where: { id },
    });

    if (!client) throw new NotFoundError();

    try {
      await this.clientRepository.update(
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

  public async deleteUserById(id: number) {
    return this.clientRepository.deleteById(id);
  }
}
