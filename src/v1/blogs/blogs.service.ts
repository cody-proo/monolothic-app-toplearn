import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { Not } from 'typeorm';
import { Category } from '../categories/categories.entity';
import { Blog } from './blogs.entity';
import { CreateBlogDTO, UpdateBlogDTO } from './dtos';

@Injectable()
export class BlogsService {
  constructor(private readonly genericRepo: GenericRepository<Blog>) {}

  create(data: CreateBlogDTO) {}

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
    if(data.text) updatedData.text=data.text||blog.title
    return this.genericRepo.update({ id }, updatedData);
  }

  async delete(id: number) {
    const blog = await this.genericRepo.selectById(id);
    if (!blog) {
      throw new NotFoundException('blog not found');
    }
    return this.genericRepo.delete(id);
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
