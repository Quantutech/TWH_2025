import Inject from '../decorators/inject';
import Service from '../decorators/service';
import Handlebars from '../services/core/handlebars';
import ILoader from './abstracts/ILoader';

@Service()
export default class TemplateEngineLoader implements ILoader {
    constructor(@Inject() private handlebars: Handlebars) { }

    public async load(): Promise<void> {
        this.handlebars.initialize();
    }

    public async destroy(): Promise<void> {
        // nothing to do here
    }
}
