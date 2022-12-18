import { Controller, Get } from '@nestjs/common';

@Controller('videos')
export class VideosController {
  @Get()
  getAllVideos() {}


  @Get('course/')
  groupVideosBasedOnCourse() {}

  @Get('course/:id')
  getAllVideosBasedOnCourse() {}
}
