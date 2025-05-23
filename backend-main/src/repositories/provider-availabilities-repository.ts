import Repository from '../decorators/repository';
import ProviderAvailability from '../models/ProviderAvailabilities';
import BaseRepository from './abstracts/base-repository';

@Repository(ProviderAvailability)
export default class ProviderAvailabilityRepository extends BaseRepository<ProviderAvailability> {
}
