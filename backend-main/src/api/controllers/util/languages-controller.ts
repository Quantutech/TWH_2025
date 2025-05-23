import Get from '../../decorators/get';
import BaseController from '../abstracts/base-controller';
import Controller from '../../decorators/controller';
import Inject from '../../../decorators/inject';
import LanguageService from '../../../services/util/languge-service';
import Delete from '../../decorators/delete';
import Put from '../../decorators/put';
import Post from '../../decorators/post';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from '../../../errors/custom-errors';
import Language from '../../../models/Language';
import { Request } from 'express';
import Middleware from '../../decorators/middleware';
import { VerifyAdmin } from '../../../middleware/verify-admin';

@Controller('/util/languages')
export default class UtilLanguage extends BaseController {
  constructor(@Inject() private readonly languageService: LanguageService) {
    super();
  }

  @Get('/')
  public async getAllLanguages(
    req: Request,
    res: Response
  ): Promise<Language[]> {
    try {
      return await this.languageService.getAllLanguages();
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  }

  @Get('/name/:name')
  public async getLanguageByName(
    req: Request,
    res: Response
  ): Promise<Language> {
    try {
      const { name } = req.params;
      const language = await this.languageService.findByName(name);
      if (!language) {
        throw new NotFoundError('Language not found');
      }
      return language;
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  }

  @Get('/:id')
  public async getLanguageById(req: Request, res: Response): Promise<Language> {
    try {
      const { id } = req.params;
      const language = await this.languageService.findById(id);
      if (!language) {
        throw new NotFoundError('Language not found');
      }
      return language;
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  }

  @Post('/')
  @Middleware([VerifyAdmin()])
  public async createLanguage(req: Request, res: Response): Promise<Language> {
    try {
      const { name } = req.body;
      if (!name) {
        throw new BadRequestError('Language name is required');
      }
      return await this.languageService.createLanguage(name);
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  }

  @Put('/:id')
  @Middleware([VerifyAdmin()])
  public async updateLanguage(req: Request, res: Response): Promise<boolean> {
    try {
      const { id } = req.params;
      const { name } = req.body;

      if (!name) {
        throw new BadRequestError('Language name is required');
      }

      const updatedLanguage = await this.languageService.updateLanguage(
        id,
        name
      );
      if (!updatedLanguage) {
        throw new NotFoundError('Language not found');
      }

      return updatedLanguage;
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  }

  @Delete('/:id')
  @Middleware([VerifyAdmin()])
  public async deleteLanguage(req: Request, res: Response): Promise<boolean> {
    try {
      const { id } = req.params;

      const deleted = await this.languageService.deleteLanguage(id);
      if (!deleted) {
        throw new NotFoundError('Language not found');
      }

      return true;
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  }
}
