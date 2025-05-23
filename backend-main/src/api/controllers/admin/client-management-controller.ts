import Inject from '../../../decorators/inject';
import AdminService from '../../../services/admin';
import Controller from '../../decorators/controller';
import BaseController from '../abstracts/base-controller';
import Middleware from '../../decorators/middleware';
import { VerifyAdmin } from '../../../middleware/verify-admin';
import { IRequestWithUser } from '../../../types/types';
import Get from '../../decorators/get';
import Post from '../../decorators/post';
import BlogService from '../../../services/util/blog-service';
import { SourceType } from '../../../types/common-types';
import { Validator } from '../../../middleware/validator';
import Delete from '../../decorators/delete';
import ClientService from '../../../services/client';
import Put from '../../decorators/put';
import {
  AdminClientUpdateDTO,
  AdminUserCreateDTO,
} from '../../../dtos/admin/management/user.dto';
import { plainToInstance } from 'class-transformer';
import { NotFoundError } from '../../../errors/custom-errors';
import { ClientUpdateDTO } from '../../../dtos/client/client-update.dto';
import ClientAuthService from '../../../services/client/auth-service';

@Controller('/admin/client')
export default class AdminClientController extends BaseController {
  constructor(
    @Inject() private readonly clientService: ClientService,
    @Inject() private readonly clientAuthService: ClientAuthService
  ) {
    super();
  }

  @Post('/')
  @Middleware([VerifyAdmin(), Validator(AdminUserCreateDTO)])
  public async createUser(req: IRequestWithUser, res: Response) {
    const user = await this.clientAuthService.register(
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
    return await this.clientService.getClients();
  }

  @Get('/:id')
  @Middleware([VerifyAdmin()])
  public async getUser(req: IRequestWithUser, res: Response) {
    const { id } = req.params;
    return await this.clientService.getClientById(Number(id));
  }

  @Put('/:id')
  @Middleware([VerifyAdmin(), Validator(AdminClientUpdateDTO)])
  public async updateUser(req: IRequestWithUser, res: Response) {
    const { id } = req.params;
    const data = await this.clientService.updateClient(
      Number(id),
      plainToInstance(ClientUpdateDTO, req.body)
    );

    return data;
  }

  @Delete('/:id')
  @Middleware([VerifyAdmin()])
  public async deleteUser(req: IRequestWithUser, res: Response) {
    const { id } = req.params;
    return await this.clientService.deleteUserById(Number(id));
  }
}
