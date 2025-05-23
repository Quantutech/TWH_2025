import Inject from '../../../decorators/inject';
import AdminService from '../../../services/admin';
import Controller from '../../decorators/controller';
import BaseController from '../abstracts/base-controller';
import Middleware from '../../decorators/middleware';
import { VerifyAdmin } from '../../../middleware/verify-admin';
import { IRequestWithUser } from '../../../types/types';
import Get from '../../decorators/get';
import Delete from '../../decorators/delete';
import { VerifySuperAdmin } from '../../../middleware/verify-super-admin';

@Controller('/admin/management')
export default class AdminManagementController extends BaseController {
  constructor(@Inject() private readonly adminService: AdminService) {
    super();
  }

  @Get('/')
  @Middleware([VerifyAdmin()])
  public async listAdmins(req: IRequestWithUser, res: Response) {
    return await this.adminService.getAllAdmins();
  }

  @Get('/:id')
  @Middleware([VerifyAdmin()])
  public async getAdmin(req: IRequestWithUser, res: Response) {
    const { id } = req.params;
    return await this.adminService.getAdminById(id);
  }

  @Delete('/:id')
  @Middleware([VerifySuperAdmin()])
  public async deleteAdmin(req: IRequestWithUser, res: Response) {
    const { id } = req.params;
    return await this.adminService.deleteAdmin(id);
  }

  // @Put('/:id')
  // @Middleware([VerifySuperAdmin(), Validator(UpdateAdminDto, SourceType.Body)])
  // public async updateAdmin(req: IRequestWithUser, res: Response) {
  //   const { id } = req.params;
  //   const body = req.body;
  //   return await this.adminService.updateAdmin(id, body);
  // }
}
