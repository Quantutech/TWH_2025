import Inject from '../../decorators/inject';
import Service from '../../decorators/service';
import { NotFoundError } from '../../errors/custom-errors';
import Blog from '../../models/Blog';
import { PaginatedResult } from '../../repositories/abstracts/base-repository';
import BlogRepository from '../../repositories/blog-repository';

@Service()
export default class BlogService {
  constructor(@Inject() private readonly blogRepository: BlogRepository) {}
  public async getBlogPaginatedList(
    limit: number,
    page: number
  ): Promise<PaginatedResult<Blog>> {
    const paginateData = await this.blogRepository.getPaginatedList(
      limit,
      page
    );

    if (!paginateData.data || paginateData.data.length === 0) {
      throw new NotFoundError('No data found');
    }

    return paginateData;
  }

  public async createBlog({
    adminId,
    title,
    contextUrl,
  }: {
    adminId: number;
    title: string;
    contextUrl?: string | null;
  }) {
    try {
      const blog = await this.blogRepository.createBlog(
        adminId,
        title,
        contextUrl ?? undefined
      );

      return blog;
    } catch (error) {
      console.error(error);
      throw new Error('Error creating blog');
    }
  }
}
