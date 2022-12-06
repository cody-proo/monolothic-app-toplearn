import { Injectable, NotFoundException } from '@nestjs/common';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { Course } from './courses.entity';

@Injectable()
export class CoursesService {
  constructor(private readonly genericRepo: GenericRepository<Course>) {}

  async selectById(id: number) {
    const course = await this.genericRepo.selectById(id);
    if (!course) {
      throw new NotFoundException('course is not found');
    }
    return course;
  }
}
