import Controller from '../../decorators/controller';
import Get from '../../decorators/get';
import BaseController from '../abstracts/base-controller';

@Controller('/client')
export default class SuggestionListController extends BaseController {
  constructor() {
    super();
  }

  @Get('/suggestions')
  public async getSuggestions(req: Request) {
    return { message: 'Suggestion list' };
  }
}
