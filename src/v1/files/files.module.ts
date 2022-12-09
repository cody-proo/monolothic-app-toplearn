import { GenericRepository } from './../../common/repositories/generic.repository';
import { forwardRef, Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { CoursesModule } from '../courses/courses.module';

@Module({
  imports: [forwardRef(() => CoursesModule)],
  providers: [FilesService, GenericRepository],
  exports: [FilesService],
})
export class FilesModule {}
