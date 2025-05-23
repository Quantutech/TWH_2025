import * as bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import slugify from 'slugify';
import OauthConfig from '../../configs/ouath2-config';
import { emailLayoutAttachments } from '../../consts/email-attachments';
import Inject from '../../decorators/inject';
import Service from '../../decorators/service';
import { ProviderRegisterDTO } from '../../dtos/provider/auth/register.dto';
import { BadRequestError, NotFoundError } from '../../errors/custom-errors';
import AdminRepository from '../../repositories/admin-repository';
import ClientRepository from '../../repositories/client-repository';
import ProviderRepository from '../../repositories/provider-repository';
import Handlebars from '../core/handlebars';
import MailService from '../mail-service';

@Service()
export default class ProviderAuthService {
  private readonly SALT_ROUNDS = 10;
  private readonly googleProvider: OAuth2Client;

  constructor(
    @Inject() private readonly providerRepository: ProviderRepository,
    @Inject() private readonly clientRepository: ClientRepository,
    @Inject() private readonly adminRepository: AdminRepository,
    @Inject() private readonly handleService: Handlebars,
    @Inject() private readonly mailService: MailService
  ) {
    this.googleProvider = new OAuth2Client({
      clientId: OauthConfig.clientId,
      clientSecret: OauthConfig.clientSecret,
      redirectUri: OauthConfig.redirectUri,
    });
  }

  public async login(email: string, password: string) {
    const user = await this.providerRepository.findByEmail(email);
    if (!user)
      throw new BadRequestError('This email does not match our records!');

    const isPasswordValid = await this.isPasswordValid(password, user.password);

    if (!isPasswordValid) throw new BadRequestError('Invalid password');
    if (!user.isEmailVerified)
      throw new BadRequestError('You need to verify your email');
    return user;
  }

  public async findByEmail(email: string) {
    const user = await this.providerRepository.findByEmail(email);
    if (!user)
      throw new NotFoundError('This email does not match our records!');

    return user;
  }

  public async parseHandlebar(templateName: string, data: object = {}) {
    return this.handleService.parse(templateName, data);
  }

  public async register(provider: ProviderRegisterDTO) {
    const isEmailTaken = await Promise.any([
      this.providerRepository.findByEmail(provider.email),
      this.clientRepository.findByEmail(provider.email),
      this.adminRepository.findByEmail(provider.email),
    ]);

    const emailTaken = !!isEmailTaken;

    if (emailTaken) {
      throw new BadRequestError('This email is already in use!');
    }

    provider.password = await this.hashPassword(provider.password);
    const baseSlug = slugify(`${provider.firstName} ${provider.lastName}`, {
      lower: true,
      strict: true,
      trim: true,
    });

    let profileSlug = baseSlug;
    let isUnique = false;
    let counter = 1;

    while (!isUnique) {
      const existingSlug = await this.providerRepository.findOne({
        where: { profileSlug },
      });
      if (!existingSlug) {
        isUnique = true;
      } else {
        profileSlug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    provider.profileSlug = profileSlug;

    return await this.providerRepository.create(provider as any);
  }

  public async verifyEmail(email: string) {
    // Find user by email and update emailVerified to true
    return this.providerRepository.updateEmailVerified(email);
  }

  public async updateUserPasswordById(id: number, password: string) {
    return this.providerRepository.updatePasswordById(id, password);
  }

  public async updatePasswordByEmail(email: string, password: string) {
    return this.providerRepository.updatePasswordByEmail(email, password);
  }

  // Password validation function
  public async isPasswordValid(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    // First check using bcrypt's comparison (using email as salt)
    const isValid = await this.comparePassword(password, hashedPassword);
    if (isValid) return true;
    return false;
  }

  // Generate password hash using email as salt
  public async hashPassword(password: string): Promise<string> {
    // Use email as salt when hashing the password
    const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);
    return hashedPassword;
  }

  // Compare password with hashed password
  public async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  public async googleLogin() {
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ];

    const url = this.googleProvider.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      include_granted_scopes: true,
    });

    return url;
  }

  public async googleCallback(code: string) {
    try {
      const { tokens } = await this.googleProvider.getToken(code);
      this.googleProvider.setCredentials(tokens);

      const userInfoProvider = await this.googleProvider.request({
        url: 'https://www.googleapis.com/oauth2/v3/userinfo',
      });

      const userData: any = userInfoProvider.data;

      let provider = await this.providerRepository.findByEmail(userData.email);

      if (!provider) {
        provider = await this.providerRepository.create({
          email: userData.email,
          firstName: userData.given_name,
          lastName: userData.family_name,
          password: await this.hashPassword(Math.random().toString(36)),
          emailVerified: true,
        });
      }

      return provider;
    } catch (error) {
      throw new BadRequestError('Failed to authenticate with Google');
    }
  }

  public async sendWithLayoutEmail(
    email: string,
    subject: string,
    html: string
  ): Promise<void> {
    await this.mailService.sendEmail(
      email,
      subject,
      html,
      emailLayoutAttachments
    );
  }

  public async verifyPassword(
    id: number,
    currentPassword: string
  ): Promise<boolean> {
    const user = await this.providerRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return bcrypt.compare(currentPassword, user.password);
  }

  async sendEmailVerificationCode(providerId: number) {
    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();

    const provider = await this.providerRepository.findById(providerId);
    if (!provider) {
      throw new NotFoundError('Provider not found');
    }

    await this.providerRepository.update(
      { where: { id: providerId } },
      { verificationCode }
    );

    return { verificationCode, provider };
  }

  async verifyEmailChange(
    id: number,
    verificationCode: string,
    email: string
  ): Promise<boolean> {
    const provider = await this.providerRepository.findById(id);
    if (!provider) {
      throw new NotFoundError('Provider not found');
    }

    if (provider.verificationCode !== verificationCode) {
      throw new BadRequestError('Invalid verification code');
    }

    await this.providerRepository.update(
      { where: { id } },
      { verificationCode: null, email }
    );

    return true;
  }
}
