import { forwardRef, Module } from '@nestjs/common';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { CategoriesModule } from '../categories/categories.module';
import { FilesModule } from '../files/files.module';

@Module({
  providers: [CoursesService, GenericRepository],
  exports: [CoursesService],
  controllers: [CoursesController],
  imports: [CategoriesModule, forwardRef(() => FilesModule)],
})
export class CoursesModule {}
