import { Request } from 'express';
import Inject from '../../../decorators/inject';
import { Validator } from '../../../middleware/validator';
import JwtService from '../../../services/jwt-service';
import Controller from '../../decorators/controller';
import Middleware from '../../decorators/middleware';
import Post from '../../decorators/post';
import BaseController from '../abstracts/base-controller';
import AdminAuthService from '../../../services/admin/auth-service';
import { AdminLoginDto } from '../../../dtos/admin/auth/login.dto';
import { AdminCreateDTO } from '../../../dtos/admin/auth/create.dto';
import { plainToInstance } from 'class-transformer';
import { NotFoundError } from '../../../errors/custom-errors';
import { userInfo } from 'os';
import Get from '../../decorators/get';
import { VerifyAdmin } from '../../../middleware/verify-admin';
import { IRequestWithUser } from '../../../types/types';
import { VerifySuperAdmin } from '../../../middleware/verify-super-admin';

@Controller('/admin')
export default class AdminAuthController extends BaseController {
  constructor(
    @Inject() private readonly jwtService: JwtService,
    @Inject() private readonly adminAuthService: AdminAuthService
  ) {
    super();
  }

  @Post('/login')
  @Middleware([Validator(AdminLoginDto)])
  public async login(req: Request) {
    const { email, password } = req.body;
    const user = await this.adminAuthService.login(email, password);
    const token = this.jwtService.generateAdminJwt({
      userId: user.id,
      userSlug: user.profileSlug,
      isSuper: user.isSuper,
    });
    const refreshToken = this.jwtService.generateAdminRefreshToken({
      userId: user.id,
      userSlug: user.profileSlug,
      isSuper: user.isSuper,
    });
    return {
      token,
      refreshToken,
    };
  }

  @Post('/create')
  @Middleware([VerifySuperAdmin(), Validator(AdminCreateDTO)])
  public async create(req: Request) {
    const admin = await this.adminAuthService.create(
      plainToInstance(AdminCreateDTO, req.body)
    );

    if (!admin) {
      throw new NotFoundError('Admin already exists');
    }

    return {
      message: 'Admin created successfully!',
    };
  }

  @Get('/me')
  @Middleware([VerifyAdmin()])
  public async me(req: IRequestWithUser) {
    const { userId } = req.user;
    return await this.adminAuthService.getMe(userId.toString());
  }
}
