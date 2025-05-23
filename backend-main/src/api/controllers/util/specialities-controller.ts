import { Request } from 'express';
import Inject from '../../../decorators/inject';
import { InsurancesListDTO } from '../../../dtos/insurances/insurance-list.dto';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from '../../../errors/custom-errors';
import { VerifyAdmin } from '../../../middleware/verify-admin';
import Specialty from '../../../models/Specialty';
import SpecialtyService from '../../../services/util/specialty-service';
import Controller from '../../decorators/controller';
import Delete from '../../decorators/delete';
import Get from '../../decorators/get';
import Middleware from '../../decorators/middleware';
import Post from '../../decorators/post';
import Put from '../../decorators/put';
import BaseController from '../abstracts/base-controller';
import { Validator } from '../../../middleware/validator';
import { SourceType } from '../../../types/common-types';

@Controller('/util/specialities')
export default class UtilSpecialty extends BaseController {
  constructor(@Inject() private readonly specialtyService: SpecialtyService) {
    super();
  }

  @Get('/')
  @Middleware([Validator(InsurancesListDTO, SourceType.Query)])
  public async getAllSpecialities(req: Request, res: Response) {
    const { limit, page, keyword } = req.query;
    const data = await this.specialtyService.getPaginationList({
      limit: Number(limit),
      page: Number(page),
      keyword,
    } as InsurancesListDTO);

    return data;
  }

  @Get('/name/:name')
  public async getSpecialtyByName(
    req: Request,
    res: Response
  ): Promise<Specialty> {
    try {
      const { name } = req.params;
      const insurance = await this.specialtyService.findByName(name);
      if (!insurance) {
        throw new NotFoundError('Specialty not found');
      }
      return insurance;
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  }

  @Get('/:id')
  public async getSpecialtyById(
    req: Request,
    res: Response
  ): Promise<Specialty> {
    try {
      const { id } = req.params;
      const insurance = await this.specialtyService.findById(id);
      if (!insurance) {
        throw new NotFoundError('Specialty not found');
      }
      return insurance;
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  }

  @Post('/')
  @Middleware([VerifyAdmin()])
  public async createSpecialty(
    req: Request,
    res: Response
  ): Promise<Specialty> {
    try {
      const { name } = req.body;
      if (!name) {
        throw new BadRequestError('Specialty name is required');
      }
      return await this.specialtyService.createSpecialty(name);
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  }

  @Put('/:id')
  @Middleware([VerifyAdmin()])
  public async updateSpecialty(req: Request, res: Response): Promise<boolean> {
    try {
      const { id } = req.params;
      const { name } = req.body;

      if (!name) {
        throw new BadRequestError('Specialty name is required');
      }

      const updatedSpecialty = await this.specialtyService.updateSpecialty(
        id,
        name
      );
      if (!updatedSpecialty) {
        throw new NotFoundError('Specialty not found');
      }

      return updatedSpecialty;
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  }

  @Delete('/:id')
  @Middleware([VerifyAdmin()])
  public async deleteSpecialty(req: Request, res: Response): Promise<boolean> {
    try {
      const { id } = req.params;

      const deleted = await this.specialtyService.deleteSpecialty(id);
      if (!deleted) {
        throw new NotFoundError('Specialty not found');
      }

      return true;
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  }
}
