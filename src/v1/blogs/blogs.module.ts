import { CategoriesModule } from './../categories/categories.module';
import { Module } from '@nestjs/common';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';

@Module({
  controllers: [BlogsController],
  providers: [BlogsService, GenericRepository],
  imports: [CategoriesModule],
})
export class BlogsModule {}
