import { FindOptions, Op, WhereOptions } from 'sequelize';
import Repository from '../decorators/repository';
import { AddressCommonDTO } from '../dtos/address-common';
import AddressModel from '../models/Address';
import City from '../models/City';
import Country from '../models/Country';
import State from '../models/State';
import BaseRepository, { PaginatedResult } from './abstracts/base-repository';
import CountryTimezone from '../models/CountryTimezone';

@Repository(AddressModel)
export class AddressRepository extends BaseRepository<AddressModel> {
}

@Repository(Country)
export class CountryRepository extends BaseRepository<Country> {
  public async getPaginatedList(
    request: AddressCommonDTO,
  ): Promise<PaginatedResult<Country>> {
    const { limit, page = 1, keyword } = request;

    const whereClause: WhereOptions = keyword
      ? {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${keyword}%`,
            },
          },
        ],
      }
      : {};

    const options: FindOptions<Country> = {
      where: whereClause,
      order: [['name', 'ASC']],
    };

    return this.paginate(options, page, limit);
  }
}

@Repository(State)
export class StateRepository extends BaseRepository<State> {
  public async getPaginatedList(
    request: AddressCommonDTO,
  ): Promise<PaginatedResult<State>> {
    const { limit, page = 1, keyword, countryId } = request;

    const whereClause: WhereOptions = {
      ...(keyword && {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${keyword}%`,
            },
          },
        ],
      }),
      ...(countryId && { countryId }),
    };

    const options: FindOptions<State> = {
      where: whereClause,
      order: [['name', 'ASC']],
    };

    return this.paginate(options, page, limit);
  }
}

@Repository(CountryTimezone)
export class CountryTimezoneRepository extends BaseRepository<CountryTimezone> {
  public async getPaginatedList(
    request: AddressCommonDTO,
  ): Promise<PaginatedResult<CountryTimezone>> {
    const { limit, page = 1, keyword, countryId } = request;

    const whereClause: WhereOptions = {
      ...(keyword && {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${keyword}%`,
            },
          },
        ],
      }),
      ...(countryId && { countryId }),
    };

    const options: FindOptions<CountryTimezone> = {
      where: whereClause,
      order: [['name', 'ASC']],
    };

    return this.paginate(options, page, limit);
  }
}

@Repository(City)
export class CityRepository extends BaseRepository<City> {
  public async getPaginatedList(
    request: AddressCommonDTO,
  ): Promise<PaginatedResult<City>> {
    const { limit, page = 1, keyword, stateId } = request;

    const whereClause: WhereOptions = {
      ...(keyword && {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${keyword}%`,
            },
          },
        ],
      }),
      ...(stateId && { stateId }),
    };

    const options: FindOptions<City> = {
      where: whereClause,
      order: [['name', 'ASC']],
    };

    return this.paginate(options, page, limit);
  }
}