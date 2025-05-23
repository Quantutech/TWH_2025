import path from 'path/win32';
import Inject from '../../../decorators/inject';
import { GetBlogDto } from '../../../dtos/admin/blog.dto';
import { BadRequestError, NotFoundError } from '../../../errors/custom-errors';
import { uploadHtmlMiddleware } from '../../../middleware/upload-html-middleware';
import { uploadImageMiddleware } from '../../../middleware/upload-image-middleware';
import { Validator } from '../../../middleware/validator';
import { VerifyAdmin } from '../../../middleware/verify-admin';
import BlogService from '../../../services/util/blog-service';
import { SourceType } from '../../../types/common-types';
import { IRequestWithUser } from '../../../types/types';
import Controller from '../../decorators/controller';
import Get from '../../decorators/get';
import Middleware from '../../decorators/middleware';
import Post from '../../decorators/post';
import BaseController from '../abstracts/base-controller';

@Controller('/upload')
export default class UploadController extends BaseController {
  constructor(@Inject() private readonly blogService: BlogService) {
    super();
  }

  // hangi durumlarda image silinmeli buna gore delete endpointi olustur
  @Post('/image')
  @Middleware([VerifyAdmin(), uploadImageMiddleware])
  public async createImage(req: IRequestWithUser, res: Response) {
    const context = req.body.compressedImageName;

    const fullContextPath = context
      ? path.join(process.cwd(), 'uploads', context)
      : null;

    return { name: fullContextPath };
  }

  @Post('/blog')
  @Middleware([VerifyAdmin(), uploadHtmlMiddleware])
  public async createBlog(req: IRequestWithUser, res: Response) {
    const { userId: adminId } = req.user;
    const title: string[] = req.body.title;
    const context = req.body?.uploadedHtmlName;

    const fullContextPath = context
      ? path.join(process.cwd(), 'uploads', context)
      : null;

    const blog = await this.blogService.createBlog({
      adminId,
      title: title[0],
      contextUrl: fullContextPath,
    });

    return blog;
  }

  @Get('/blog')
  @Middleware([Validator(GetBlogDto, SourceType.Query)])
  public async getBlogs(req: IRequestWithUser, res: Response) {
    try {
      const { limit = 10, page = 1 } = req.query;

      const limitNumber = Number(limit);
      const pageNumber = Number(page);
      if (isNaN(limitNumber) || isNaN(pageNumber)) {
        throw new BadRequestError('Invalid pagination parameters');
      }

      const blogs = await this.blogService.getBlogPaginatedList(
        limitNumber,
        pageNumber
      );

      return blogs;
    } catch (error) {
      throw new NotFoundError('No data found');
    }
  }
}
