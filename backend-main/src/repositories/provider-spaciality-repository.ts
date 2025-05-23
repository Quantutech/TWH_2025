import Repository from "../decorators/repository";
import ProviderSpeciality from "../models/ProviderSpeciality";
import BaseRepository from "./abstracts/base-repository";

@Repository(ProviderSpeciality)
export default class ProviderSpecialityRepository extends BaseRepository<ProviderSpeciality> {
}