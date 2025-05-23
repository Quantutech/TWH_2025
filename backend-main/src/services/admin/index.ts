import Inject from '../../decorators/inject';
import Service from '../../decorators/service';
import { NotFoundError } from '../../errors/custom-errors';
import AdminRepository from '../../repositories/admin-repository';

@Service()
export default class AdminService {
  constructor(
    @Inject()
    private readonly adminRepository: AdminRepository
  ) {}

  public async getAllAdmins() {
    const admins = await this.adminRepository.findAll();
    if (!admins) throw new NotFoundError('No admins found');
    return admins;
  }

  public async getAdminById(id: string) {
    const admin = await this.adminRepository.findById(id);
    if (!admin) throw new NotFoundError('Admin not found');
    return admin;
  }

  public async deleteAdmin(id: string) {
    const deleted = await this.adminRepository.deleteById(id);
    if (!deleted) throw new NotFoundError('Admin not found or delete failed');
    return { message: 'Admin deleted successfully' };
  }

  // public async updateAdmin(id: string, updateData: Partial<UpdateAdminDto>) {
  //   const updatedAdmin = await this.adminRepository.updateById(id, updateData);
  //   if (!updatedAdmin)
  //     throw new NotFoundError('Admin not found or update failed');
  //   return updatedAdmin;
  // }
}
