import Repository from "../decorators/repository";
import ProviderLanguage from "../models/ProviderLanguage";
import BaseRepository from "./abstracts/base-repository";

@Repository(ProviderLanguage)
export default class ProviderLanguageRepository extends BaseRepository<ProviderLanguage> {
}