import Inject from '../../../decorators/inject';
import Controller from '../../decorators/controller';
import BaseController from '../abstracts/base-controller';
import Middleware from '../../decorators/middleware';
import { VerifyAdmin } from '../../../middleware/verify-admin';
import { IRequestWithUser } from '../../../types/types';
import Get from '../../decorators/get';
import Post from '../../decorators/post';
import { Validator } from '../../../middleware/validator';
import Delete from '../../decorators/delete';
import Put from '../../decorators/put';
import {
  AdminClientUpdateDTO,
  AdminProviderUpdateDTO,
  AdminUserCreateDTO,
} from '../../../dtos/admin/management/user.dto';
import { plainToInstance } from 'class-transformer';
import { NotFoundError } from '../../../errors/custom-errors';
import ProviderService from '../../../services/provider';
import ProviderAuthService from '../../../services/provider/auth-service';

@Controller('/admin/provider')
export default class AdminClientController extends BaseController {
  constructor(
    @Inject() private readonly providerService: ProviderService,
    @Inject() private readonly providerAuthService: ProviderAuthService
  ) {
    super();
  }

  @Post('/')
  @Middleware([VerifyAdmin(), Validator(AdminUserCreateDTO)])
  public async createUser(req: IRequestWithUser, res: Response) {
    const user = await this.providerAuthService.register(
      plainToInstance(AdminUserCreateDTO, req.body)
    );

    if (!user) {
      throw new NotFoundError('User already exists');
    }

    return {
      message: 'User created successfully!',
    };
  }

  @Get('/')
  @Middleware([VerifyAdmin()])
  public async listUsers(req: IRequestWithUser, res: Response) {
    return await this.providerService.getAllProviders();
  }

  @Get('/:id')
  @Middleware([VerifyAdmin()])
  public async getUser(req: IRequestWithUser, res: Response) {
    const { id } = req.params;
    return await this.providerService.getProviderById(Number(id));
  }

  @Delete('/:id')
  @Middleware([VerifyAdmin()])
  public async deleteUser(req: IRequestWithUser, res: Response) {
    const { id } = req.params;
    return await this.providerService.deleteProvideById(Number(id));
  }
}
