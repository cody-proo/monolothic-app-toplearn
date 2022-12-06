import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { Category } from './categories.entity';
import { CreateCategoryDTO, UpdateCategoryDTO } from './dtos';
import { Not } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(private readonly genericRepo: GenericRepository<Category>) {}

  async create(data: CreateCategoryDTO) {
    const titleOrSlugTakeBefore = await this.genericRepo.select([
      { title: data.title },
      { slug: data.slug },
    ]);
    if (titleOrSlugTakeBefore) {
      throw new BadRequestException('title or slug is take before');
    }
    if (data.parentCategories) {
      const parentCategory = await this.genericRepo.selectById(
        data.parentCategories as number,
      );
      if (!parentCategory) {
        throw new NotFoundException('parent category is not exist');
      }
      data.parentCategories = parentCategory;
    }
    return this.genericRepo.create({
      ...data,
      parentCategories: data?.parentCategories as Category,
    });
  }

  async delete(id: number) {
    const isCategoryExist = await this.genericRepo.selectById(id);
    if (!isCategoryExist) {
      throw new NotFoundException('category is not exist');
    }
    return this.genericRepo.delete({ id });
  }

  async update(id: number, data: UpdateCategoryDTO) {
    const updatedData: Partial<{
      title: string;
      slug: string;
      parentCategory: Category;
    }> = {};
    const isCategoryExist = await this.genericRepo.selectById(id);
    if (!isCategoryExist) {
      throw new NotFoundException('category is not exist');
    }
    const contextExist = await this.genericRepo.select([
      { title: data.title, id: Not(id) },
      { slug: data.slug, id: Not(id) },
    ]);
    if (contextExist) {
      throw new BadRequestException('title or slug is exist before');
    }
    return this.genericRepo.update({ id }, updatedData);
  }

  selectAll() {
    return this.genericRepo.selectAll();
  }

  async selectById(id: number) {
    const category = await this.genericRepo.selectById(id);
    if (!category) {
      throw new NotFoundException('category not found');
    }
    return category;
  }
}
