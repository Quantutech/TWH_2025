import Inject from '../../decorators/inject';
import Service from '../../decorators/service';
import { BadRequestError } from '../../errors/custom-errors';
import NewsLetterSubscriptionRepository from '../../repositories/newsletter-subscription-repository';

@Service()
export default class NewsletterService {
  constructor(
    @Inject()
    private readonly newsletterSubscriptionRepository: NewsLetterSubscriptionRepository
  ) {}

  public async subscribeToNewsletter(email: string): Promise<void> {
    // Check if the email is already subscribed
    const existingSubscription =
      await this.newsletterSubscriptionRepository.findOne({
        where: { email },
      });

    if (existingSubscription) {
      throw new BadRequestError(
        'Email is already subscribed to the newsletter.'
      );
    }

    // Create a new subscription
    await this.newsletterSubscriptionRepository.create({ email });
  }

  public async unsubscribeFromNewsletter(email: string): Promise<void> {
    // Check if the email is subscribed
    const existingSubscription =
      await this.newsletterSubscriptionRepository.findOne({
        where: { email },
      });

    if (!existingSubscription) {
      throw new BadRequestError('Email is not subscribed to the newsletter.');
    }

    // Delete the subscription
    await this.newsletterSubscriptionRepository.delete({ where: { email } });
  }

  public async getAllSubscribers(): Promise<any[]> {
    return await this.newsletterSubscriptionRepository.findAll();
  }
}
