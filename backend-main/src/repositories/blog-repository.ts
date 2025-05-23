import { FindOptions, WhereOptions } from 'sequelize';
import Repository from '../decorators/repository';
import Blog from '../models/Blog';
import BlogModel from '../models/Blog';
import BaseRepository, { PaginatedResult } from './abstracts/base-repository';

@Repository(BlogModel)
export default class BlogRepository extends BaseRepository<BlogModel> {
  public async createBlog(
    adminId: number,
    title: string,
    contextUrl?: string
  ): Promise<BlogModel> {
    return BlogModel.create({ adminId, title, contextUrl });
  }

  public async getPaginatedList(
    limit?: number,
    page?: number
  ): Promise<PaginatedResult<Blog>> {
    const whereClause: WhereOptions = {};
    const options: FindOptions<Blog> = {
      where: whereClause,
      order: [['createdAt', 'DESC']],
    };

    return this.paginate(options, page, limit);
  }

  public async findBlogById(id: number): Promise<BlogModel | null> {
    return BlogModel.findOne({ where: { id } });
  }

  public async findAllBlogs(): Promise<BlogModel[]> {
    return BlogModel.findAll();
  }

  public async deleteBlog(id: number): Promise<void> {
    const blog = await this.findBlogById(id);
    if (!blog) {
      throw new Error('BlogModel not found');
    }
    await blog.destroy();
  }
}
