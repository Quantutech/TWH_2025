import { Request } from 'express';
import Inject from '../../../decorators/inject';
import { InsurancesListDTO } from '../../../dtos/insurances/insurance-list.dto';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from '../../../errors/custom-errors';
import { Validator } from '../../../middleware/validator';
import { VerifyAdmin } from '../../../middleware/verify-admin';
import Insurance from '../../../models/Insurance';
import InsuranceService from '../../../services/util/insurance-service';
import { SourceType } from '../../../types/common-types';
import Controller from '../../decorators/controller';
import Delete from '../../decorators/delete';
import Get from '../../decorators/get';
import Middleware from '../../decorators/middleware';
import Post from '../../decorators/post';
import Put from '../../decorators/put';
import BaseController from '../abstracts/base-controller';

@Controller('/util/insurances')
export default class UtilInsurance extends BaseController {
  constructor(@Inject() private readonly insuranceService: InsuranceService) {
    super();
  }

  @Get('/')
  @Middleware([Validator(InsurancesListDTO, SourceType.Query)])
  public async getAllInsurances(req: Request, res: Response) {
    const { limit, page, keyword } = req.query;
    const data = await this.insuranceService.getPaginationList({
      limit: Number(limit),
      page: Number(page),
      keyword,
    } as InsurancesListDTO);

    return data;
  }

  @Get('/name/:name')
  public async getInsuranceByName(
    req: Request,
    res: Response
  ): Promise<Insurance> {
    try {
      const { name } = req.params;
      const insurance = await this.insuranceService.findByName(name);
      if (!insurance) {
        throw new NotFoundError('Insurance not found');
      }
      return insurance;
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  }

  @Get('/:id')
  public async getInsuranceById(
    req: Request,
    res: Response
  ): Promise<Insurance> {
    try {
      const { id } = req.params;
      const insurance = await this.insuranceService.findById(id);
      if (!insurance) {
        throw new NotFoundError('Insurance not found');
      }
      return insurance;
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  }

  @Post('/')
  @Middleware([VerifyAdmin()])
  public async createInsurance(
    req: Request,
    res: Response
  ): Promise<Insurance> {
    try {
      const { name } = req.body;
      if (!name) {
        throw new BadRequestError('Insurance name is required');
      }
      return await this.insuranceService.createInsurance(name);
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  }

  @Put('/:id')
  @Middleware([VerifyAdmin()])
  public async updateInsurance(req: Request, res: Response): Promise<boolean> {
    try {
      const { id } = req.params;
      const { name } = req.body;

      if (!name) {
        throw new BadRequestError('Insurance name is required');
      }

      const updatedInsurance = await this.insuranceService.updateInsurance(
        id,
        name
      );
      if (!updatedInsurance) {
        throw new NotFoundError('Insurance not found');
      }

      return updatedInsurance;
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  }

  @Delete('/:id')
  @Middleware([VerifyAdmin()])
  public async deleteInsurance(req: Request, res: Response): Promise<boolean> {
    try {
      const { id } = req.params;

      const deleted = await this.insuranceService.deleteInsurance(id);
      if (!deleted) {
        throw new NotFoundError('Insurance not found');
      }

      return true;
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  }
}
