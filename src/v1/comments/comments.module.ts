import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { CoursesModule } from '../courses/courses.module';

@Module({
  providers: [CommentsService, GenericRepository],
  controllers: [CommentsController],
  imports: [CoursesModule],
})
export class CommentsModule {}
