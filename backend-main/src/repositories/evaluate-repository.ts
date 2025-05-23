import Repository from '../decorators/repository';
import RateModel from '../models/Evaluate';
import BaseRepository, { PaginatedResult } from './abstracts/base-repository';
import { InsurancesListDTO } from '../dtos/insurances/insurance-list.dto';
import { FindOptions, Op, WhereOptions } from 'sequelize';

@Repository(RateModel)
export default class EvaluateRepository extends BaseRepository<RateModel> {
  public async findByName(name: string): Promise<RateModel | null> {
    return this.model.findOne({ where: { name } });
  }

  public async findById(id: string): Promise<RateModel | null> {
    return this.model.findOne({ where: { id } });
  }

  public async findAllRates(): Promise<RateModel[]> {
    return this.model.findAll();
  }

  public async createRate(name: string): Promise<RateModel> {
    return this.model.create({ name });
  }

  public async updateRate(id: string, name: string): Promise<[number]> {
    return this.model.update({ name }, { where: { id } });
  }

  public async deleteRate(id: string): Promise<number> {
    return this.model.destroy({ where: { id } });
  }

  public async getPaginatedList(
    request: InsurancesListDTO
  ): Promise<PaginatedResult<RateModel>> {
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

    const options: FindOptions<RateModel> = {
      where: whereClause,
      order: [['name', 'ASC']],
    };

    return this.paginate(options, page, limit);
  }
}
