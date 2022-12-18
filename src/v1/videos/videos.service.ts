import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { CreateVideoDTO } from './dtos';

@Injectable()
export class VideosService {
  constructor(@InjectQueue('file') private readonly fileProcess: Queue) {}

  create(video: Express.Multer.File, data: CreateVideoDTO) {
    this.fileProcess.add('video', {
      screenShotName: 'myscreen',
      videoName: 'myvideo',
      file: video,
    });
    return { message: 'Videos service' };
  }
}
