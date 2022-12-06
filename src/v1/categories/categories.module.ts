import { Module } from '@nestjs/common';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, GenericRepository],
})
export class CategoriesModule {}
