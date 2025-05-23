import Inject from '../../../decorators/inject';
import Controller from '../../decorators/controller';
import Middleware from '../../decorators/middleware';
import Post from '../../decorators/post';
import BaseController from '../abstracts/base-controller';
import { Validator } from '../../../middleware/validator';
import { NewsLetterDTO } from '../../../dtos/public/newsletter-dto';
import { Request } from 'express';
import NewsletterService from '../../../services/public/newsletter-service';

@Controller('/newsletter')
export default class NewsletterController extends BaseController {
  constructor(@Inject() private readonly newsletterService: NewsletterService) {
    super();
  }

  @Post('/subscribe')
  @Middleware([Validator(NewsLetterDTO)])
  public async subscribe(req: Request) {
    const { email } = req.body;
    await this.newsletterService.subscribeToNewsletter(email);
    return { message: 'Subscription successful' };
  }

  @Post('/unsubscribe')
  @Middleware([Validator(NewsLetterDTO)])
  public async unsubscribe(req: Request) {
    const { email } = req.body;
    await this.newsletterService.unsubscribeFromNewsletter(email);
    return { message: 'Unsubscription successful' };
  }
}
