import { GenericRepository } from 'src/common/repositories/generic.repository';
import { In } from 'typeorm';
import { Category } from './categories.entity';

export class CategoriesRepository extends GenericRepository<Category> {
  selectByIds(ids: number[]) {
    return Category.find({ where: { id: In(ids) } });
  }
}
