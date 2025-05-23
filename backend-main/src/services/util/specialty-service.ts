import Inject from '../../decorators/inject';
import Service from '../../decorators/service';
import { InsurancesListDTO } from '../../dtos/insurances/insurance-list.dto';
import { NotFoundError } from '../../errors/custom-errors';
import SpecialtyModel from '../../models/Specialty';
import SpecialtyRepository from '../../repositories/specialty-repository';

@Service()
export default class SpecialtyService {
  constructor(
    @Inject() private readonly specialtyRepository: SpecialtyRepository
  ) { }

  public async findByName(name: string): Promise<SpecialtyModel | null> {
    return this.specialtyRepository.findByName(name);
  }

  public async findById(id: string): Promise<SpecialtyModel | null> {
    return this.specialtyRepository.findById(id);
  }

  public async getAllSpecialtys(): Promise<SpecialtyModel[]> {
    return this.specialtyRepository.findAllSpecialtys();
  }

  public async createSpecialty(name: string): Promise<SpecialtyModel> {
    return this.specialtyRepository.createSpecialty(name);
  }

  public async updateSpecialty(id: string, name: string): Promise<boolean> {
    const [updatedCount] = await this.specialtyRepository.updateSpecialty(id, name);
    return updatedCount > 0;
  }

  public async deleteSpecialty(id: string): Promise<boolean> {
    const deletedCount = await this.specialtyRepository.deleteSpecialty(id);
    return deletedCount > 0;
  }

  public async getPaginationList({ limit, page, keyword }: InsurancesListDTO) {
    const paginateData = await this.specialtyRepository.getPaginatedList({
      limit,
      page,
      keyword,
    });

    if (!paginateData.data || paginateData.data.length === 0) {
      throw new NotFoundError('No data found');
    }

    return paginateData;
  }
}
