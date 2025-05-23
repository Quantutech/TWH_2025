import { FindOptions, Op, WhereOptions } from 'sequelize';
import Repository from '../decorators/repository';
import { InsurancesListDTO } from '../dtos/insurances/insurance-list.dto';
import InsuranceModel from '../models/Insurance';
import BaseRepository, { PaginatedResult } from './abstracts/base-repository';

@Repository(InsuranceModel)
export default class InsuranceRepository extends BaseRepository<InsuranceModel> {
  public async getPaginatedList(
    request: InsurancesListDTO
  ): Promise<PaginatedResult<InsuranceModel>> {
    const { limit, page = 1, keyword } = request;

    const whereClause: WhereOptions = keyword
      ? {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${keyword}%`,
            },
          },
        ],
      }
      : {};

    const options: FindOptions<InsuranceModel> = {
      where: whereClause,
      order: [['name', 'ASC']],
    };

    return this.paginate(options, page, limit);
  }

  public async findByName(name: string): Promise<InsuranceModel | null> {
    return this.model.findOne({ where: { name } });
  }

  public async findById(id: string): Promise<InsuranceModel | null> {
    return this.model.findOne({ where: { id } });
  }

  public async findAllInsurances(): Promise<InsuranceModel[]> {
    return this.model.findAll();
  }

  public async createInsurance(name: string): Promise<InsuranceModel> {
    return this.model.create({ name });
  }

  public async updateInsurance(id: string, name: string): Promise<[number]> {
    return this.model.update({ name }, { where: { id } });
  }

  public async deleteInsurance(id: string): Promise<number> {
    return this.model.destroy({ where: { id } });
  }
}