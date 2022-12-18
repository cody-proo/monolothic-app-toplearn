import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';

@Module({
  controllers: [VideosController],
  providers: [VideosService],
  imports: [BullModule.registerQueue({ name: 'file' })],
})
export class VideosModule {}
