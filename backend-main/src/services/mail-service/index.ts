import nodemailer, { Transporter } from 'nodemailer';
import Service from '../../decorators/service';
import SmtpConfig from '../../configs/smtp-config';

@Service()
export default class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: SmtpConfig.host,
      port: Number(SmtpConfig.port),
      secure: SmtpConfig.secure,
      auth: {
        user: SmtpConfig.auth.user,
        pass: SmtpConfig.auth.pass,
      },
      requireTLS: true
    });
  }

  public async sendEmail(
    to: string,
    subject: string,
    html: string,
    attachments?: any
  ): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: SmtpConfig.from,
        to,
        subject,
        html,
        attachments
      });
      console.log("Sended mail")
    } catch (error) {
      console.log(error)
    }
  }
}
