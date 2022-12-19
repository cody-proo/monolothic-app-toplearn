import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { CoursesModule } from '../courses/courses.module';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';

@Module({
  controllers: [VideosController],
  providers: [VideosService],
  imports: [BullModule.registerQueue({ name: 'video' }), CoursesModule],
})
export class VideosModule {}
