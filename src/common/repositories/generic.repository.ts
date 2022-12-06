import {
  DeepPartial,
  DeleteResult,
  FindOptionsWhere,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CoreEntity } from '../core/core.entity';
import { IRepository } from '../interfaces/repository.interface';

export class GenericRepository<T extends CoreEntity> implements IRepository<T> {
  constructor(
    private readonly model: (new () => CoreEntity) & typeof CoreEntity,
  ) {}
  create(data: DeepPartial<T>): Promise<T> {
    return this.model.save(data) as Promise<T>;
  }
  update(
    where: FindOptionsWhere<T> | number[],
    data: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult> {
    return this.model.update(where, data);
  }
  delete(where: FindOptionsWhere<T> | number[]): Promise<DeleteResult> {
    return this.model.delete(where);
  }
  select(where: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T> {
    return this.model.findOne({ where }) as Promise<T>;
  }
  selectAll(where: FindOptionsWhere<T> = {}): Promise<T[]> {
    return this.model.find({ where }) as Promise<T[]>;
  }
  selectById(id: number): Promise<T> {
    return this.model.findOneBy({ id }) as Promise<T>;
  }
}
