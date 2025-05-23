import Repository from '../decorators/repository';
import ProviderSubscription from '../models/ProviderSubscription';
import BaseRepository from './abstracts/base-repository';

@Repository(ProviderSubscription)
export default class ProviderSubscriptionRepository extends BaseRepository<ProviderSubscription> {}
