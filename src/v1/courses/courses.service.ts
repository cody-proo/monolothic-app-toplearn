import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { CategoriesService } from '../categories/categories.service';
import { File } from '../files/files.entity';
import { FilesService } from '../files/files.service';
import { User } from '../users/users.entity';
import { Course, CourseStatus } from './courses.entity';
import { CreateCourseDTO, UpdateCourseDTO } from './dtos';

@Injectable()
export class CoursesService {
  constructor(
    private readonly genericRepo: GenericRepository<Course>,
    private readonly categoriesService: CategoriesService,
    private readonly filesService: FilesService,
  ) {}

  async selectById(id: number) {
    const course = await this.genericRepo.selectById(id);
    if (!course) {
      throw new NotFoundException('course is not found');
    }
    return course;
  }

  async create(data: CreateCourseDTO, teacher: User) {
    const titleExist = await this.genericRepo.select({ title: data.title });
    if (titleExist) {
      throw new BadRequestException('title exist before');
    }
    const categories = await this.categoriesService.selectByIds(
      data.categories as number[],
    );
    if (categories.length !== data.categories.length) {
      throw new BadRequestException('categories data is invalid');
    }
    const file = await this.filesService.selectById(data.image);
    return this.genericRepo.create({
      title: data.title,
      image: file,
      categories,
      teacher,
      level: data.level,
      price: data.price,
      description: data.description,
      status: CourseStatus.STOP,
    });
  }

  async update(data: UpdateCourseDTO, id: number, teacher: User) {
    const course = await this.selectById(id);
    if (course.teacher.id !== teacher.id) {
      throw new ForbiddenException('only teacher access');
    }

    if (data.title) {
      const titleExist = await this.genericRepo.select({ title: data.title });
      if (titleExist) {
        throw new BadRequestException('title exist before');
      }
    }

    if (data.categories) {
      const categories = await this.categoriesService.selectByIds(
        data.categories as number[],
      );
      if (categories.length !== data.categories.length) {
        throw new BadRequestException('categories data is invalid');
      }
      data.categories = categories;
    }

    if (data.image) {
      const file = await this.filesService.selectById(data.image as number);
      data.image = file as File;
    }

    return this.genericRepo.update({ id: course.id }, data as any);
  }

  async delete() {}

  selectAll() {
    return this.genericRepo.selectAll();
  }
}
