import Inject from '../../decorators/inject';
import Service from '../../decorators/service';
import { InsurancesListDTO } from '../../dtos/insurances/insurance-list.dto';
import { NotFoundError } from '../../errors/custom-errors';
import InsuranceModel from '../../models/Insurance';
import InsuranceRepository from '../../repositories/insurance-repository';

@Service()
export default class InsuranceService {
  constructor(
    @Inject() private readonly insuranceRepository: InsuranceRepository
  ) { }


  public async findByName(name: string): Promise<InsuranceModel | null> {
    return this.insuranceRepository.findByName(name);
  }

  public async findById(id: string): Promise<InsuranceModel | null> {
    return this.insuranceRepository.findById(id);
  }

  public async getPaginationList({ limit, page, keyword }: InsurancesListDTO) {
    const paginateData = await this.insuranceRepository.getPaginatedList({
      limit,
      page,
      keyword,
    });

    if (!paginateData.data || paginateData.data.length === 0) {
      throw new NotFoundError('No data found');
    }

    return paginateData;
  }

  public async createInsurance(name: string): Promise<InsuranceModel> {
    return this.insuranceRepository.createInsurance(name);
  }

  public async updateInsurance(id: string, name: string): Promise<boolean> {
    const [updatedCount] = await this.insuranceRepository.updateInsurance(id, name);
    return updatedCount > 0;
  }

  public async deleteInsurance(id: string): Promise<boolean> {
    const deletedCount = await this.insuranceRepository.deleteInsurance(id);
    return deletedCount > 0;
  }
}
