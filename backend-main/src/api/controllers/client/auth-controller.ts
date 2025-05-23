import { plainToInstance } from 'class-transformer';
import { Request } from 'express';
import WebServerConfigs from '../../../configs/web-server-config';
import Inject from '../../../decorators/inject';
import { ConfirmEmailDTO } from '../../../dtos/change-email.dto';
import { ChangePasswordDTO } from '../../../dtos/change-password.dto';
import { ClientForgotPasswordDTO } from '../../../dtos/client/auth/forgot-password.dto';
import { ClientLoginDto } from '../../../dtos/client/auth/login.dto';
import { ClientRefreshTokenDto } from '../../../dtos/client/auth/refresh-token.dto';
import { ClientRegisterDTO } from '../../../dtos/client/auth/register.dto';
import { ClientResetPasswordDTO } from '../../../dtos/client/auth/reset-password.dto';
import { ClientSendVerifyEmailDTO } from '../../../dtos/client/auth/send-verify-email.dto';
import { ClientVerifyEmailDTO } from '../../../dtos/client/auth/verify-email.dto';
import { BadRequestError, NotFoundError } from '../../../errors/custom-errors';
import { Validator } from '../../../middleware/validator';
import { VerifyClient } from '../../../middleware/verify-client';
import ClientAuthService from '../../../services/client/auth-service';
import JwtService from '../../../services/jwt-service';
import { IRequestWithUser } from '../../../types/types';
import Controller from '../../decorators/controller';
import Get from '../../decorators/get';
import Middleware from '../../decorators/middleware';
import Post from '../../decorators/post';
import BaseController from '../abstracts/base-controller';

@Controller('/client')
export default class ClientAuthController extends BaseController {
  constructor(
    @Inject() private readonly jwtService: JwtService,
    @Inject() private readonly clientAuthService: ClientAuthService
  ) {
    super();
  }

  @Post('/login')
  @Middleware([Validator(ClientLoginDto)])
  public async login(req: Request) {
    const { email, password } = req.body;
    const user = await this.clientAuthService.login(email, password);
    const token = this.jwtService.generateClientJwt({
      userId: user.id,
      userSlug: user.profileSlug,
      isEmailVerified: user.isEmailVerified,
    });

    const refreshToken = this.jwtService.generateClientRefreshToken({
      userId: user.id,
      userSlug: user.profileSlug,
      isEmailVerified: user.isEmailVerified,
    });
    return {
      token,
      refreshToken,
    };
  }

  @Post('/register')
  @Middleware([Validator(ClientRegisterDTO)])
  public async register(req: Request) {
    const user = await this.clientAuthService.register(
      plainToInstance(ClientRegisterDTO, req.body)
    );

    if (!user) {
      throw new NotFoundError('User already exists');
    }

    const token = this.jwtService.generateClientJwt(
      {
        userid: user.id,
        email: user.email,
      },
      '5m'
    );

    const url = `${WebServerConfigs.frontURl}/verify-email/client?token=${token}`;
    const htmlData = await this.clientAuthService.parseHandlebar(
      'provider-verification',
      {
        url,
        name: user.firstName,
        email: user.email,
      }
    );

    this.clientAuthService.sendWithLayoutEmail(
      user.email,
      'Register',
      htmlData
    );

    return {
      message: 'User registered successfully! Please verify your email.',
    };
  }

  @Post('/refresh-token')
  @Middleware([Validator(ClientRefreshTokenDto)])
  public async refreshToken(req: Request) {
    const { refreshToken } = req.body;
    const { userId, userSlug, isEmailVerified } =
      this.jwtService.verifyClientRefreshToken(refreshToken);

    const token = this.jwtService.generateClientJwt({
      userId,
      userSlug,
      isEmailVerified,
    });

    const newRefreshToken = this.jwtService.generateClientRefreshToken({
      userId,
      userSlug,
    });

    return { token, refreshToken: newRefreshToken };
  }

  @Post('/send-verification-email')
  @Middleware([Validator(ClientSendVerifyEmailDTO)])
  public async sendVerificationEmail(req: Request) {
    const { email } = req.body;

    const client = await this.clientAuthService.findByEmail(email);

    const token = this.jwtService.generateClientJwt(
      {
        id: client.id,
      },
      '5m'
    );

    const url = `${WebServerConfigs.frontURl}/verify-email/provider?token=${token}`;
    const htmlData = await this.clientAuthService.parseHandlebar(
      'provider-verification',
      {
        url,
        name: client.firstName,
        email: client.email,
      }
    );

    this.clientAuthService.sendWithLayoutEmail(
      client.email,
      'Register',
      htmlData
    );

    return { message: 'Verification email sent successfully!' };
  }

  @Post('/verify-email')
  @Middleware([Validator(ClientVerifyEmailDTO)])
  public async verifyEmail(req: Request) {
    const { token } = req.body;
    const { email } = this.jwtService.verifyClientJwt(token);
    if (!email) {
      throw new Error('Invalid token');
    }
    await this.clientAuthService.verifyEmail(email);
    return { message: 'Email verified successfully!' };
  }

  @Post('/forgot-password')
  @Middleware([Validator(ClientForgotPasswordDTO)])
  public async forgotPassword(req: Request) {
    const { email } = req.body;
    const client = await this.clientAuthService.findByEmail(email);

    const token = this.jwtService.generateClientJwt(
      {
        id: client.id,
        email: client.email,
      },
      '5m'
    );

    const url = `${WebServerConfigs.frontURl}/reset-password/provider?token=${token}`;
    const htmlData = await this.clientAuthService.parseHandlebar(
      'forgot-password',
      {
        url,
        name: client.firstName,
        email: client.email,
      }
    );

    this.clientAuthService.sendWithLayoutEmail(
      client.email,
      'Forgot Password',
      htmlData
    );
    return { message: 'Sended mail.' };
  }

  @Post('/reset-password')
  @Middleware([Validator(ClientResetPasswordDTO)])
  public async resetPassword(req: Request) {
    const { token, newPassword } = req.body;
    const { email } = this.jwtService.verifyClientJwt(token);
    if (!email) {
      throw new Error('Invalid token');
    }

    const hashedPassword = await this.clientAuthService.hashPassword(
      newPassword
    );

    await this.clientAuthService.updatePasswordByEmail(email, hashedPassword);

    return { message: 'Password reset successfully!' };
  }

  @Get('/google/login')
  public async googleAuth() {
    const url = await this.clientAuthService.googleLogin();
    return { url };
  }

  @Get('/google/callback')
  public async googleCallback(req: Request) {
    const { code } = req.query;

    if (!code || typeof code !== 'string') {
      throw new BadRequestError('Invalid authorization code');
    }

    const user = await this.clientAuthService.googleCallback(code);

    const token = this.jwtService.generateClientJwt({
      userId: user.id,
      isEmailVerified: user.isEmailVerified,
      userSlug: user.profileSlug,
    });

    const refreshToken = this.jwtService.generateClientRefreshToken({
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
  @Middleware([VerifyClient(), Validator(ChangePasswordDTO)])
  public async changePassword(req: IRequestWithUser) {
    const { currentPassword, newPassword } = req.body;
    const { userId } = req.user;

    const isValidPassword = await this.clientAuthService.verifyPassword(
      userId,
      currentPassword
    );
    if (!isValidPassword) {
      throw new BadRequestError('Current password is incorrect');
    }

    const hashedPassword = await this.clientAuthService.hashPassword(
      newPassword
    );

    await this.clientAuthService.updateUserPasswordById(userId, hashedPassword);

    return {
      message: 'Password changed successfully!',
    };
  }

  @Post('/request-email-change')
  @Middleware([VerifyClient()])
  public async requestEmailChange(req: IRequestWithUser) {
    const { userId } = req.user;
    const { verificationCode, client } =
      await this.clientAuthService.sendEmailVerificationCode(userId);

    const htmlData = await this.clientAuthService.parseHandlebar('send-code', {
      name: client.firstName,
      email: client.email,
      digit1: verificationCode[0],
      digit2: verificationCode[1],
      digit3: verificationCode[2],
      digit4: verificationCode[3],
    });

    this.clientAuthService.sendWithLayoutEmail(
      client.email,
      'Change Email',
      htmlData
    );

    return {
      message: 'Please verify your email.',
    };
  }

  @Post('/confirm-email-change')
  @Middleware([VerifyClient(), Validator(ConfirmEmailDTO)])
  public async confirmEmailChange(req: IRequestWithUser) {
    const { userId } = req.user;
    const { verificationCode, newEmail } = req.body;
    const isVerified = await this.clientAuthService.verifyEmailChange(
      userId,
      verificationCode,
      newEmail
    );

    if (isVerified) {
      return { message: 'Email change confirmed.' };
    } else {
      throw new BadRequestError('Invalid verification code');
    }
  }
}
