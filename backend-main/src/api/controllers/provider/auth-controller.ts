import { plainToInstance } from 'class-transformer';
import { Request } from 'express';
import WebServerConfigs from '../../../configs/web-server-config';
import Inject from '../../../decorators/inject';
import { ConfirmEmailDTO } from '../../../dtos/change-email.dto';
import { ChangePasswordDTO } from '../../../dtos/change-password.dto';
import { ProviderForgotPasswordDTO } from '../../../dtos/provider/auth/forgot-password.dto';
import { ProviderLoginDto } from '../../../dtos/provider/auth/login.dto';
import { ProviderRefreshTokenDto } from '../../../dtos/provider/auth/refresh-token.dto';
import { ProviderRegisterDTO } from '../../../dtos/provider/auth/register.dto';
import { ProviderResetPasswordDTO } from '../../../dtos/provider/auth/reset-password.dto';
import { ProviderSendVerifyEmailDTO } from '../../../dtos/provider/auth/send-verify-email.dto';
import { ProviderVerifyEmailDTO } from '../../../dtos/provider/auth/verify-email.dto';
import { BadRequestError } from '../../../errors/custom-errors';
import { Validator } from '../../../middleware/validator';
import { VerifyProvider } from '../../../middleware/verify-provider';
import JwtService from '../../../services/jwt-service';
import ProviderAuthService from '../../../services/provider/auth-service';
import { IRequestWithUser } from '../../../types/types';
import Controller from '../../decorators/controller';
import Get from '../../decorators/get';
import Middleware from '../../decorators/middleware';
import Post from '../../decorators/post';
import BaseController from '../abstracts/base-controller';

@Controller('/provider')
export default class ProviderAuthController extends BaseController {
  constructor(
    @Inject() private readonly jwtService: JwtService,
    @Inject() private readonly providerAuthService: ProviderAuthService
  ) {
    super();
  }

  @Post('/login')
  @Middleware([Validator(ProviderLoginDto)])
  public async login(req: Request) {
    const { email, password } = req.body;

    const user = await this.providerAuthService.login(email, password);
    const token = this.jwtService.generateProviderJwt({
      userId: user.id,
      userSlug: user.profileSlug,
      isEmailVerified: user.isEmailVerified
    });

    const refreshToken = this.jwtService.generateProviderRefreshToken({
      userId: user.id,
      userSlug: user.profileSlug,
      isEmailVerified: user.isEmailVerified
    });
    return {
      token,
      refreshToken,
    };
  }

  @Post('/register')
  @Middleware([Validator(ProviderRegisterDTO)])
  public async register(req: Request) {
    const user = await this.providerAuthService.register({
      ...plainToInstance(ProviderRegisterDTO, req.body),
    });

    const token = this.jwtService.generateProviderJwt({
      id: user.id,
      email: user.email,
    }, "5m");

    const url = `${WebServerConfigs.frontURl}/verify-email/provider?token=${token}`;
    const htmlData = await this.providerAuthService.parseHandlebar(
      'provider-verification',
      {
        url,
        name: user.firstName,
        email: user.email
      }
    );

    this.providerAuthService.sendWithLayoutEmail(user.email, 'Register', htmlData);

    return {
      message: 'User registered successfully! Please verify your email.',
    };
  }

  @Post('/refresh-token')
  @Middleware([Validator(ProviderRefreshTokenDto)])
  public async refreshToken(req: Request) {
    const { refreshToken } = req.body;
    const { userId, userSlug, isEmailVerified } =
      this.jwtService.verifyProviderRefreshToken(refreshToken);

    const token = this.jwtService.generateProviderJwt({
      userId,
      userSlug,
      isEmailVerified
    });
    const newRefreshToken = this.jwtService.generateProviderRefreshToken({
      userId,
      userSlug,
      isEmailVerified
    });

    return { token, refreshToken: newRefreshToken };
  }

  @Post('/send-verification-email')
  @Middleware([Validator(ProviderSendVerifyEmailDTO)])
  public async sendVerificationEmail(req: Request) {
    const { email } = req.body;
    const provider = await this.providerAuthService.findByEmail(email)

    const token = this.jwtService.generateProviderJwt({
      id: provider.id,
      email: provider.email,
    }, "5m");

    const url = `${WebServerConfigs.frontURl}/verify-email/provider?token=${token}`;
    const htmlData = await this.providerAuthService.parseHandlebar(
      'provider-verification',
      {
        url,
        name: provider.firstName,
        email: provider.email
      }
    );

    this.providerAuthService.sendWithLayoutEmail(provider.email, 'Register', htmlData);
    return { message: 'Verification email sent successfully!' };
  }

  @Post('/verify-email')
  @Middleware([Validator(ProviderVerifyEmailDTO)])
  public async verifyEmail(req: Request) {
    const { token } = req.body;
    const { email } = this.jwtService.verifyProviderJwt(token);
    if (!email) {
      throw new Error('Invalid token');
    }
    const user = await this.providerAuthService.verifyEmail(email);
    return { message: 'Email verified successfully!', user };
  }

  @Post('/forgot-password')
  @Middleware([Validator(ProviderForgotPasswordDTO)])
  public async forgotPassword(req: Request) {
    const { email } = req.body;
    const provider = await this.providerAuthService.findByEmail(email)

    const token = this.jwtService.generateProviderJwt({
      id: provider.id,
      email: provider.email,
    }, "5m");

    const url = `${WebServerConfigs.frontURl}/reset-password/provider?token=${token}`;
    const htmlData = await this.providerAuthService.parseHandlebar(
      'forgot-password',
      {
        url,
        name: provider.firstName,
        email: provider.email
      }
    );

    this.providerAuthService.sendWithLayoutEmail(provider.email, 'Forgot Password', htmlData);
    return { message: 'Password reset link sent to email' };
  }

  @Post('/reset-password')
  @Middleware([Validator(ProviderResetPasswordDTO)])
  public async resetPassword(req: Request) {
    const { token, newPassword } = req.body;
    const { email } = this.jwtService.verifyProviderJwt(token);
    if (!email) {
      throw new Error('Invalid token');
    }

    const hashedPassword = await this.providerAuthService.hashPassword(
      newPassword
    );

    const user = await this.providerAuthService.updatePasswordByEmail(
      email,
      hashedPassword
    );

    return { message: 'Password reset successfully!', user };
  }

  @Get('/google/login')
  public async googleAuth() {
    const url = await this.providerAuthService.googleLogin();
    return { url };
  }

  @Get('/google/callback')
  public async googleCallback(req: Request) {
    const { code } = req.query;

    if (!code || typeof code !== 'string') {
      throw new BadRequestError('Invalid authorization code');
    }

    const user = await this.providerAuthService.googleCallback(code);

    const token = this.jwtService.generateProviderJwt({
      userId: user.id,
      isEmailVerified: user.isEmailVerified,
      userSlug: user.profileSlug,
    });

    const refreshToken = this.jwtService.generateProviderRefreshToken({
      userId: user.id,
      isEmailVerified: user.isEmailVerified,
      userSlug: user.profileSlug,
    });

    return {
      token,
      refreshToken,
      user,
    };
  }

  @Post('/change-password')
  @Middleware([VerifyProvider(), Validator(ChangePasswordDTO)])
  public async changePassword(req: IRequestWithUser) {
    const { currentPassword, newPassword } = req.body;
    const { userId } = req.user;

    const isValidPassword = await this.providerAuthService.verifyPassword(userId, currentPassword);
    if (!isValidPassword) {
      throw new BadRequestError('Current password is incorrect');
    }

    const hashedPassword = await this.providerAuthService.hashPassword(newPassword);

    await this.providerAuthService.updateUserPasswordById(userId, hashedPassword);

    return {
      message: 'Password changed successfully!',
    };
  }

  @Post('/request-email-change')
  @Middleware([VerifyProvider()])
  public async requestEmailChange(req: IRequestWithUser) {
    const { userId } = req.user;
    const { verificationCode, provider } = await this.providerAuthService.sendEmailVerificationCode(userId);

    const htmlData = await this.providerAuthService.parseHandlebar(
      'send-code',
      {
        name: provider.firstName,
        email: provider.email,
        digit1: verificationCode[0],
        digit2: verificationCode[1],
        digit3: verificationCode[2],
        digit4: verificationCode[3]
      }
    );

    this.providerAuthService.sendWithLayoutEmail(provider.email, 'Change Email', htmlData);

    return {
      message: 'Please verify your email.',
    };
  }

  @Post('/confirm-email-change')
  @Middleware([VerifyProvider(), Validator(ConfirmEmailDTO)])
  public async confirmEmailChange(req: IRequestWithUser) {
    const { userId } = req.user;
    const { verificationCode, newEmail } = req.body;
    const isVerified = await this.providerAuthService.verifyEmailChange(userId, verificationCode, newEmail);

    if (isVerified) {
      return { message: 'Email change confirmed.' };
    } else {
      throw new BadRequestError('Invalid verification code');
    }
  }
}
