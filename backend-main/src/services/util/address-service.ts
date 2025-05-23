import Inject from '../../decorators/inject';
import Service from '../../decorators/service';
import { AddressCommonDTO } from '../../dtos/address-common';
import { NotFoundError } from '../../errors/custom-errors';
import { CityRepository, CountryRepository, CountryTimezoneRepository, StateRepository } from '../../repositories/addresss-repository';

@Service()
export default class AddressService {
  constructor(
    @Inject() private readonly countryRepository: CountryRepository,
    @Inject() private readonly stateRepository: StateRepository,
    @Inject() private readonly cityRepository: CityRepository,
    @Inject() private readonly countryTimeZoneRepository: CountryTimezoneRepository
  ) { }

  public async getCountryPaginatedList({ limit, page, keyword }: AddressCommonDTO) {
    const paginateData = await this.countryRepository.getPaginatedList({
      limit,
      page,
      keyword,
    });

    if (!paginateData.data || paginateData.data.length === 0) {
      throw new NotFoundError('No data found');
    }

    return paginateData;
  }

  public async getStatePaginatedList({ limit, page, keyword, countryId }: AddressCommonDTO) {
    const paginateData = await this.stateRepository.getPaginatedList({
      limit,
      page,
      keyword,
      countryId
    });

    if (!paginateData.data || paginateData.data.length === 0) {
      throw new NotFoundError('No data found');
    }

    return paginateData;
  }

  public async getTimeZonesPaginatedList({ limit, page, keyword, countryId }: AddressCommonDTO) {
    const paginateData = await this.countryTimeZoneRepository.getPaginatedList({
      limit,
      page,
      keyword,
      countryId
    });

    if (!paginateData.data || paginateData.data.length === 0) {
      throw new NotFoundError('No data found');
    }

    return paginateData;
  }

  public async getCityPaginatedList({ limit, page, keyword, stateId }: AddressCommonDTO) {
    const paginateData = await this.cityRepository.getPaginatedList({
      limit,
      page,
      keyword,
      stateId
    });

    if (!paginateData.data || paginateData.data.length === 0) {
      throw new NotFoundError('No data found');
    }

    return paginateData;
  }
}