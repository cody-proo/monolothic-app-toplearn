import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { Not } from 'typeorm';
import { Category } from '../categories/categories.entity';
import { CategoriesService } from '../categories/categories.service';
import { User } from '../users/users.entity';
import { Blog } from './blogs.entity';
import { CreateBlogDTO, UpdateBlogDTO } from './dtos';

@Injectable()
export class BlogsService {
  constructor(
    private readonly genericRepo: GenericRepository<Blog>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(data: CreateBlogDTO & { author: User }) {
    const blog = await this.genericRepo.select({
      title: data.title,
    });
    if (blog) {
      throw new BadRequestException('title is exist');
    }
    const categories = await this.categoriesService.selectByIds(
      data.categories as number[],
    );
    if (categories.length !== data.categories.length) {
      throw new BadRequestException('invalid categories');
    }
    return this.genericRepo.create({ ...data, categories });
  }

  async update(id: number, data: UpdateBlogDTO) {
    const blog = await this.genericRepo.selectById(id);
    if (!blog) {
      throw new NotFoundException('blog not found');
    }
    const updatedData: Partial<{
      title: string;
      text: string;
      image: string;
      categories: Category[];
    }> = {};
    if (data.title) {
      const titleExist = await this.genericRepo.select({
        title: data.title,
        id: Not(blog.id),
      });
      if (titleExist) {
        throw new BadRequestException('title is exist');
      }
      updatedData.title = data.title;
    }
    if (data.text) updatedData.text = data.text || blog.title;
    return this.genericRepo.update({ id }, updatedData);
  }

  async delete(id: number) {
    const blog = await this.genericRepo.selectById(id);
    if (!blog) {
      throw new NotFoundException('blog not found');
    }
    return this.genericRepo.delete({ id });
  }
  async selectById(id: number) {
    const blog = await this.genericRepo.selectById(id);
    if (!blog) {
      throw new NotFoundException('blog not found');
    }
    return blog;
  }
  selectAll() {
    return this.genericRepo.selectAll();
  }
}
