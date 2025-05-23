import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import mjml from 'mjml';
import { EMAIL_TEMPLATES_PATH } from '../../consts/handlebars-config';
import Service from '../../decorators/service';

@Service()
export default class Handlebars {
    private templates!: Map<string, string>;
    private templatesPath = EMAIL_TEMPLATES_PATH;

    public initialize() {
        this.templates = new Map<string, string>();

        const files = fs.readdirSync(this.templatesPath);
        files.forEach((file) => {
            const content = fs
                .readFileSync(path.join(this.templatesPath, file))
                .toString();
            const name = file.split('.')[0];
            this.templates.set(name, content);
        });
    }

    public parse(templateName: string, data: object): string {
        const htmlTemplate = this.templates.get(templateName);
        const template = handlebars.compile(htmlTemplate);
        const dataTemplate = template(data);

        return mjml(dataTemplate).html;
    }
}

