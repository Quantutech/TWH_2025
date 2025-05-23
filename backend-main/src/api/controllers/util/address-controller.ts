import { Request } from 'express';
import Inject from '../../../decorators/inject';
import { AddressCommonDTO } from '../../../dtos/address-common';
import { Validator } from '../../../middleware/validator';
import AddressService from '../../../services/util/address-service';
import { SourceType } from '../../../types/common-types';
import Controller from '../../decorators/controller';
import Get from '../../decorators/get';
import Middleware from '../../decorators/middleware';
import BaseController from '../abstracts/base-controller';

@Controller('/address')
export default class UtilState extends BaseController {
  constructor(@Inject() private readonly addressService: AddressService) {
    super();
  }

  @Get('/countries')
  @Middleware([Validator(AddressCommonDTO, SourceType.Query)])
  public async getCountries(req: Request, res: Response) {
    const { limit, page, keyword } = req.query;
    const data = await this.addressService.getCountryPaginatedList({
      limit: Number(limit),
      page: Number(page),
      keyword,
    } as AddressCommonDTO);

    return data;
  }

  @Get('/states')
  @Middleware([Validator(AddressCommonDTO, SourceType.Query)])
  public async getStates(req: Request, res: Response) {
    const { limit, page, keyword, countryId } = req.query;
    return await this.addressService.getStatePaginatedList({
      limit: Number(limit),
      page: Number(page),
      keyword,
      countryId: Number(countryId)
    } as AddressCommonDTO);

  }

  @Get('/timezones')
  @Middleware([Validator(AddressCommonDTO, SourceType.Query)])
  public async getTimeZones(req: Request, res: Response) {
    const { limit, page, keyword, countryId } = req.query;
    return await this.addressService.getStatePaginatedList({
      limit: Number(limit),
      page: Number(page),
      keyword,
      countryId: Number(countryId)
    } as AddressCommonDTO);
  }

  @Get('/cities')
  @Middleware([Validator(AddressCommonDTO, SourceType.Query)])
  public async getCities(req: Request, res: Response) {
    const { limit, page, keyword, stateId } = req.query;
    return await this.addressService.getCityPaginatedList({
      limit: Number(limit),
      page: Number(page),
      keyword,
      stateId: Number(stateId)
    } as AddressCommonDTO);

  }
}
