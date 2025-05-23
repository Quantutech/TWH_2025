import { FindOptions, Op, WhereOptions } from 'sequelize';
import Repository from '../decorators/repository';
import { InsurancesListDTO } from '../dtos/insurances/insurance-list.dto';
import SpecialtyModel from '../models/Specialty';
import BaseRepository, { PaginatedResult } from './abstracts/base-repository';

@Repository(SpecialtyModel)
export default class SpecialtyRepository extends BaseRepository<SpecialtyModel> {
  public async findByName(name: string): Promise<SpecialtyModel | null> {
    return this.model.findOne({ where: { name } });
  }

  public async findById(id: string): Promise<SpecialtyModel | null> {
    return this.model.findOne({ where: { id } });
  }

  public async findAllSpecialtys(): Promise<SpecialtyModel[]> {
    return this.model.findAll();
  }

  public async createSpecialty(name: string): Promise<SpecialtyModel> {
    return this.model.create({ name });
  }

  public async updateSpecialty(id: string, name: string): Promise<[number]> {
    return this.model.update({ name }, { where: { id } });
  }

  public async deleteSpecialty(id: string): Promise<number> {
    return this.model.destroy({ where: { id } });
  }

  public async getPaginatedList(
    request: InsurancesListDTO
  ): Promise<PaginatedResult<SpecialtyModel>> {
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

    const options: FindOptions<SpecialtyModel> = {
      where: whereClause,
      order: [['name', 'ASC']],
    };

    return this.paginate(options, page, limit);
  }
}
