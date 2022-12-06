import { Module } from '@nestjs/common';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { CoursesService } from './courses.service';

@Module({
  providers: [CoursesService, GenericRepository],
  exports: [CoursesService],
})
export class CoursesModule {}
