import Service from '../../decorators/service';
import Inject from '../../decorators/inject';
import LanguageRepository from '../../repositories/language-repository';
import LanguageModel from '../../models/Language';

@Service()
export default class LanguageService {
  constructor(
    @Inject() private readonly languageRepository: LanguageRepository
  ){}

  public async findByName(name: string): Promise<LanguageModel | null> {
    return this.languageRepository.findByName(name);
  }

  public async findById(id: string): Promise<LanguageModel | null> {
    return this.languageRepository.findById(id);
  }

  public async getAllLanguages(): Promise<LanguageModel[]> {
    return this.languageRepository.findAllLanguages();
  }

  public async createLanguage(name: string): Promise<LanguageModel> {
    return this.languageRepository.createLanguage(name);
  }

  public async updateLanguage(id: string, name: string): Promise<boolean> {
    const [updatedCount] = await this.languageRepository.updateLanguage(id, name);
    return updatedCount > 0;
  }

  public async deleteLanguage(id: string): Promise<boolean> {
    const deletedCount = await this.languageRepository.deleteLanguage(id);
    return deletedCount > 0;
  }
}
