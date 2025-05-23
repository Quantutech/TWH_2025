import Repository from '../decorators/repository';
import BaseRepository from './abstracts/base-repository';
import LanguageModel from '../models/Language';

@Repository(LanguageModel)
export default class LanguageRepository extends BaseRepository<LanguageModel> {
  public async findByName(name: string): Promise<LanguageModel | null> {
    return this.model.findOne({ where: { name } });
  }

  public async findById(id: string): Promise<LanguageModel | null> {
    return this.model.findOne({ where: { id } });
  }

  public async findAllLanguages(): Promise<LanguageModel[]> {
    return this.model.findAll();
  }

  public async createLanguage(name: string): Promise<LanguageModel> {
    return this.model.create({ name });
  }

  public async updateLanguage(id: string, name: string): Promise<[number]> {
    return this.model.update({ name }, { where: { id } });
  }

  public async deleteLanguage(id: string): Promise<number> {
    return this.model.destroy({ where: { id } });
  }
}
