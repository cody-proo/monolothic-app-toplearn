import { forwardRef, Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { CategoriesModule } from '../categories/categories.module';
import { FilesModule } from '../files/files.module';
import { coursesRepositoryProvider } from '../providers.constant';

@Module({
  providers: [CoursesService, coursesRepositoryProvider],
  exports: [CoursesService],
  controllers: [CoursesController],
  imports: [CategoriesModule, forwardRef(() => FilesModule)],
})
export class CoursesModule {}
