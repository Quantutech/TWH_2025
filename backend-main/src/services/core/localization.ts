import { I18n } from 'i18n';
import Service from '../../decorators/service';

@Service()
export default class Localization {
  private i18n!: I18n;

  createLocalization() {
    this.i18n = new I18n();
  }

  configureLocalization() {
    this.i18n.configure({
      locales: ['en', 'de', 'hr', 'tr'],
      directory: 'src/locales',
      defaultLocale: 'en',
      objectNotation: true,
      updateFiles: false,
    });
  }

  public get localization(): I18n {
    return this.i18n;
  }

  public get locale(): string {
    return this.i18n.getLocale();
  }

  public set locale(locale: string) {
    this.i18n.setLocale(locale);
  }

  public getTranslation(phrase: string): string {
    return this.i18n.__(phrase);
  }

  public getTranslationWithLocale(locale: string, phrase: string): string {
    return this.i18n.__({ locale, phrase });
  }

  public localizeNumber(
    num: number,
    decimalCount = 2,
    language = this.locale
  ): string {
    return Number(num).toLocaleString(language, {
      minimumFractionDigits: decimalCount,
      maximumFractionDigits: decimalCount,
    });
  }
}
