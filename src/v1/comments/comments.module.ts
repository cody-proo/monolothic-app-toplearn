import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CoursesModule } from '../courses/courses.module';
import { commentsRepositoryProvider } from '../providers.constant';

@Module({
  providers: [CommentsService, commentsRepositoryProvider],
  controllers: [CommentsController],
  imports: [CoursesModule],
})
export class CommentsModule {}
