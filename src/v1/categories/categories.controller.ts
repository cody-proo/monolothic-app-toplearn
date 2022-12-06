import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/common/modules/jwt-auth/guards/jwt-auth.guard';
import { User } from '../users/users.entity';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO, UpdateCategoryDTO } from './dtos';

@Controller('categories')
export class CategoriesController {
  @Inject(CategoriesService)
  categoriesService: CategoriesService;

  @UseGuards(JwtAuthGuard)
  @Post()
  createCategory(@Body() body: CreateCategoryDTO) {
    return this.categoriesService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCategoryDTO,
  ) {
    return this.categoriesService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.delete(id);
  }

  @Get()
  selectAllCategories() {
    return this.categoriesService.selectAll();
  }

  @Get(':id')
  getSingleCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.selectById(id);
  }
}
