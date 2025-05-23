import Inject from '../../../decorators/inject';
import AdminService from '../../../services/admin';
import ClientService from '../../../services/client';
import BlogService from '../../../services/util/blog-service';
import Controller from '../../decorators/controller';
import BaseController from '../abstracts/base-controller';

@Controller('/admin/stat')
export default class AdminStatController extends BaseController {
  constructor(
    @Inject() private readonly adminService: AdminService,
    @Inject() private readonly clientService: ClientService,
    @Inject() private readonly blogService: BlogService
  ) {
    super();
  }
}
