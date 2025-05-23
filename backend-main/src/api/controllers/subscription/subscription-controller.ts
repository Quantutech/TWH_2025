import Inject from '../../../decorators/inject';
import { SubscriptionRequestDTO } from '../../../dtos/subcription-request.dto';
import { Validator } from '../../../middleware/validator';
import { VerifyProvider } from '../../../middleware/verify-provider';
import SubscriptionService from '../../../services/subscription';
import { IRequestWithUser } from '../../../types/types';
import Controller from '../../decorators/controller';
import Middleware from '../../decorators/middleware';
import Post from '../../decorators/post';
import BaseController from '../abstracts/base-controller';

@Controller('/subscriptions')
export default class SubscriptionController extends BaseController {
  constructor(
    @Inject() private readonly subscriptionService: SubscriptionService
  ) {
    super();
  }

  @Post('/subscribe')
  @Middleware([VerifyProvider(), Validator(SubscriptionRequestDTO)])
  public async subscribe(req: IRequestWithUser) {
    const { userId } = req.user;
    const { priceId } = req.body

    const checkoutUrl = await this.subscriptionService.subscribe(
      userId,
      priceId
    );

    return { checkoutUrl };
  }

  @Post('/cancel')
  @Middleware([VerifyProvider()])
  public async cancelSubscription(req: IRequestWithUser) {
    const { userId } = req.user;

    return {
      url: await this.subscriptionService.cancel(
        userId,
      )
    }
  }
}
