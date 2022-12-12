import { CategoriesModule } from './../categories/categories.module';
import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { blogsRepositoryProvider } from '../providers.constant';

@Module({
  controllers: [BlogsController],
  providers: [BlogsService, blogsRepositoryProvider],
  imports: [CategoriesModule],
})
export class BlogsModule {}
