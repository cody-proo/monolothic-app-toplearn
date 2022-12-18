import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { createWriteStream, unlinkSync } from 'fs';
import { Readable } from 'stream';
import * as ffpmeg from 'fluent-ffmpeg';
import * as ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
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
      screenShotName: string;
      videoName: string;
      file: Express.Multer.File;
    }>,
  ) {
    const buffer = new Uint8Array((process.data.file.buffer as any).data);
    const readStream = new Readable();
    readStream.push(buffer);
    readStream.push(null);
    const writeStream = createWriteStream('./x.mp4');
    readStream.pipe(writeStream);
    try {
      const xbg = createWriteStream('x.png');
      await ffpmeg()
        .input(readStream)
        .screenshot({
          count: 1,
          folder: './xxxx',
          timemarks: ['1'],
        })
        .output(xbg)
        .on('end', () => {
          console.log('done');
        })
        .on('error', (e) => {
          console.log('error', e);
        })
        .run();
    } catch (error) {
      console.log('error', error);
    }
  }
}
