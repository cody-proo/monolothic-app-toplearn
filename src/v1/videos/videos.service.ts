import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { extname } from 'path';
import { CreateVideoDTO } from './dtos';

@Injectable()
export class VideosService {
  constructor(@InjectQueue('file') private readonly fileProcess: Queue) {}

  create(video: Express.Multer.File, data: CreateVideoDTO) {
    const fileDist = `${new Date().getTime()}${
      Math.floor(Math.random() * 1000000) + 1000000
    }`;
    this.fileProcess.add('video', {
      file: video,
      dirname: fileDist,
    });
    return { message: 'Videos service' };
  }
}
