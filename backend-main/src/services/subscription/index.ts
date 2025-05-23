import Inject from '../../decorators/inject';
import Service from '../../decorators/service';
import { NotFoundError } from '../../errors/custom-errors';
import ProviderRepository from '../../repositories/provider-repository';
import ProviderSubscriptionRepository from '../../repositories/provider-subscription-repository';
import SubscriptionRepository from '../../repositories/subscription-repository';
import StripeService from '../stripe';

@Service()
export default class SubscriptionService {
  constructor(
    @Inject() public readonly subscriptionRepository: SubscriptionRepository,
    @Inject()
    private readonly providerSubscriptionRepository: ProviderSubscriptionRepository,
    @Inject() private readonly providerRepository: ProviderRepository,
    @Inject() private readonly stripeService: StripeService
  ) { }

  public async subscribe(
    providerId: number,
    priceId: string
  ) {
    const provider = await this.providerRepository.findById(providerId);
    if (!provider) {
      throw new NotFoundError('Provider not found');
    }

    const existingCustomers = await this.stripeService.findCustomer(provider.email);
    let customerId: string;

    if (existingCustomers) {
      customerId = existingCustomers.id;
    } else {
      customerId = await this.stripeService.createCustomer(provider.email);
    }

    return await this.stripeService.createSubscription(customerId, priceId);
  }

  public async cancel(
    providerId: number,
  ) {
    const provider = await this.providerRepository.findById(providerId);
    if (!provider) {
      throw new NotFoundError('Provider not found');
    }

    const existingCustomers = await this.stripeService.findCustomer(provider.email);

    if (!existingCustomers) {
      throw new NotFoundError('Customer not found');
    }

    return await this.stripeService.cancelSubscription(existingCustomers?.id);
  }

  public async getCustomerSubcription(
    providerEmail: string,
  ) {
    return await this.stripeService.customerMoreDetail(providerEmail);
  }

  public async getSubscriptionStatus(
    providerEmail: string,
  ) {
    return await this.stripeService.getSubscriptionStatus(providerEmail);
  }
}
