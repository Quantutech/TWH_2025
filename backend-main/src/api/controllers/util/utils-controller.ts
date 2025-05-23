import { plainToInstance } from 'class-transformer';
import Inject from '../../../decorators/inject';
import { ContactUsDTO } from '../../../dtos/contact-us.dto';
import { Validator } from '../../../middleware/validator';
import MailService from '../../../services/mail-service';
import Controller from '../../decorators/controller';
import Middleware from '../../decorators/middleware';
import Post from '../../decorators/post';
import BaseController from '../abstracts/base-controller';
import SmtpConfig from '../../../configs/smtp-config';
import Delete from '../../decorators/delete';
import { IRequestWithUser } from '../../../types/types';
import fs from 'fs';
import path from 'path/win32';
import { NotFoundError } from '../../../errors/custom-errors';
import { VerifyAnyUser } from '../../../middleware/verify-any-user';

@Controller('/utils')
export default class UtilsController extends BaseController {
  constructor(@Inject() private readonly emailService: MailService) {
    super();
  }

  @Post('/contact-us')
  @Middleware([Validator(ContactUsDTO)])
  public async getSuggestions(req: Request) {
    const { lastName, phone, email, firstName, message } = plainToInstance(
      ContactUsDTO,
      req.body
    );

    const htmlTemplate = `
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    padding: 20px;
                }
                .container {
                    background: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                    max-width: 600px;
                    margin: auto;
                }
                h2 {
                    color: #333;
                }
                p {
                    font-size: 16px;
                    line-height: 1.5;
                }
                .footer {
                    margin-top: 20px;
                    font-size: 14px;
                    color: #777;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>New Contact Us Submission</h2>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
                <p class="footer">This email was sent from the Contact Us form.</p>
            </div>
        </body>
        </html>
    `;
    await this.emailService.sendEmail(
      SmtpConfig.from,
      'contact-us',
      htmlTemplate
    );
    return { message: 'Mail Sended' };
  }

  @Delete('/image/:imageName')
  @Middleware([VerifyAnyUser()])
  public async deleteImage(req: IRequestWithUser, res: Response) {
    const { profileSlug } = req.user;
    const { imageName } = req.params;
    const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
    const compressedImagePath = path.join(UPLOAD_DIR, imageName);

    if (!imageName.startsWith(profileSlug)) {
      throw new NotFoundError('No data found!');
    }

    try {
      await fs.unlinkSync(compressedImagePath);
      return {
        message: `Image deleted: ${imageName}`,
      };
    } catch (error: any) {
      throw new NotFoundError('Image not found!');
    }
  }
}
