import Repository from '../decorators/repository';
import NewsLetterSubscription from '../models/NewsLetterSubscription';
import BaseRepository from './abstracts/base-repository';

@Repository(NewsLetterSubscription)
export default class NewsLetterSubscriptionRepository extends BaseRepository<NewsLetterSubscription> {}
