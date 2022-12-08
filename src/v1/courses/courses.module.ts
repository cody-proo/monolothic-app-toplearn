import { Module } from '@nestjs/common';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';

@Module({
  providers: [CoursesService, GenericRepository],
  exports: [CoursesService],
  controllers: [CoursesController],
})
export class CoursesModule {}
