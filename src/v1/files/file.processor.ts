import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { createWriteStream, existsSync, mkdirSync, unlinkSync } from 'fs';
import { Readable } from 'stream';
import * as ffpmeg from 'fluent-ffmpeg';
import * as ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import { extname } from 'path';
ffpmeg.setFfmpegPath(ffmpegInstaller.path);

@Processor('file')
export class FileProcessor {
  @Process({ name: 'create' })
  createFile(
    process: Job<{ file: Express.Multer.File; customFilename: string }>,
  ) {
    const buffer = (process.data.file.buffer as any).data;
    const readbleStream = new Readable();
    const writeStream = createWriteStream(
      `./public/${process.data.customFilename}`,
    );
    readbleStream.push(new Uint8Array(buffer));
    readbleStream.push(null);
    readbleStream.pipe(writeStream);
  }

  @Process({ name: 'delete' })
  deleteFile(process: Job<{ name: string }>) {
    unlinkSync(`./public/${process.data.name}`);
  }

  @Process({ name: 'video' })
  async createVideo(
    process: Job<{
      dirname: string;
      file: Express.Multer.File;
    }>,
  ) {
    const buffer = new Uint8Array((process.data.file.buffer as any).data);
    const readStream = new Readable();
    readStream.push(buffer);
    readStream.push(null);
    const videoDist = `./public/${process.data.dirname}`;
    const videoFile = `${videoDist}/video${extname(
      process.data.file.originalname,
    )}`;
    if (!existsSync(videoDist)) {
      mkdirSync(videoDist, { recursive: true });
    }
    const writeStream = createWriteStream(videoFile);
    readStream.pipe(writeStream).on('finish', () => {
      ffpmeg(videoFile).screenshot({
        count: 1,
        filename: `${videoDist}/screenshot.jpg`,
        timemarks: [0],
      });
    });
  }
}
