import { Injectable, NotFoundException } from '@nestjs/common';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { Course } from '../courses/courses.entity';
import { CoursesService } from '../courses/courses.service';
import { User } from '../users/users.entity';
import { Like } from './likes.entity';

@Injectable()
export class LikesService {
  constructor(
    private readonly genericRepo: GenericRepository<Like>,
    private readonly coursesService: CoursesService,
  ) {}

  async create(user: number, course: number) {
    const courseEntity = await this.coursesService.selectById(course);
    const like = await this.genericRepo.select({
      user: { id: user },
      course: { id: courseEntity.id },
    });
  }

  async delete(user: number, likeId: number) {
    const like = await this.selectById(likeId);
    return this.genericRepo.delete({ id: like.id, user: { id: user } });
  }

  selectAll() {
    return this.genericRepo.selectAll();
  }

  async selectById(id: number) {
    const like = await this.genericRepo.selectById(id);
    if (!like) {
      throw new NotFoundException('like not found');
    }
    return like;
  }
}
