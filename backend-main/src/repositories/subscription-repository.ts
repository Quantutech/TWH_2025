import Repository from '../decorators/repository';
import Subscription from '../models/Subscription';
import BaseRepository from './abstracts/base-repository';

@Repository(Subscription)
export default class SubscriptionRepository extends BaseRepository<Subscription> {}
