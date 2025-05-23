import * as bcrypt from 'bcrypt';
import slugify from 'slugify';
import Inject from '../../decorators/inject';
import Service from '../../decorators/service';
import { AdminCreateDTO } from '../../dtos/admin/auth/create.dto';
import { BadRequestError, NotFoundError } from '../../errors/custom-errors';
import AdminRepository from '../../repositories/admin-repository';
import ClientRepository from '../../repositories/client-repository';
import ProviderRepository from '../../repositories/provider-repository';

@Service()
export default class AdminAuthService {
  private readonly SALT_ROUNDS = 10;

  constructor(
    @Inject() private readonly adminRepository: AdminRepository,
    @Inject() private readonly providerRepository: ProviderRepository,
    @Inject() private readonly clientRepository: ClientRepository
  ) {}

  public async login(email: string, password: string) {
    const user = await this.adminRepository.findByEmail(email);
    if (!user)
      throw new BadRequestError('This email does not match our records!');

    const isPasswordValid = await this.isPasswordValid(password, user.password);

    if (!isPasswordValid) throw new BadRequestError('Invalid password');

    return user;
  }

  public async create(admin: AdminCreateDTO) {
    const isEmailTaken = await Promise.any([
      this.adminRepository.findByEmail(admin.email),
      this.providerRepository.findByEmail(admin.email),
      this.clientRepository.findByEmail(admin.email),
    ]);

    if (isEmailTaken) {
      throw new BadRequestError('This email is already in use!');
    }

    admin.password = await this.hashPassword(admin.password);

    if (!admin.profileSlug) {
      admin.profileSlug = slugify(`${admin.firstName} ${admin.lastName}`, {
        lower: true,
        strict: true,
        trim: true,
      });
    }

    let profileSlug = admin.profileSlug;
    let isUnique = false;
    let counter = 1;

    while (!isUnique) {
      const existingSlug = await this.adminRepository.findOne({
        where: { profileSlug },
      });
      if (!existingSlug) {
        isUnique = true;
      } else {
        profileSlug = `${admin.firstName.toLowerCase()}-${admin.lastName.toLowerCase()}-${counter}`;
        counter++;
      }
    }

    admin.profileSlug = profileSlug;

    const adminWithExtras = {
      ...admin,
      isSuper: false,
    };

    return await this.adminRepository.create(adminWithExtras);
  }

  public async updateUserPassword(email: string, password: string) {
    return this.adminRepository.updatePassword(email, password);
  }

  public async getMe(userId: string) {
    const admin = await this.adminRepository.findById(userId);
    if (!admin) throw new NotFoundError('Admin not found');
    return admin;
  }

  // Password validation function
  public async isPasswordValid(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    // First check using bcrypt's comparison (using email as salt)
    return await this.comparePassword(password, hashedPassword);
  }

  // Generate password hash using email as salt
  public async hashPassword(password: string): Promise<string> {
    // Use email as salt when hashing the password
    return await bcrypt.hash(password, this.SALT_ROUNDS);
  }

  // Compare password with hashed password
  public async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  public async getUserWithId(id: string) {
    return this.adminRepository.findById(id);
  }
}
