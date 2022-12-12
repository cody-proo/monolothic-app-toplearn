import { Module } from '@nestjs/common';
import { categoriesRepositoryProvider } from '../providers.constant';
import { CategoriesController } from './categories.controller';
import { CategoriesRepository } from './categories.repository';
import { CategoriesService } from './categories.service';

@Module({
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    CategoriesRepository,
    categoriesRepositoryProvider,
  ],
  exports: [CategoriesService],
})
export class CategoriesModule {}
