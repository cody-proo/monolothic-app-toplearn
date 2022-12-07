import { Injectable, NotFoundException } from '@nestjs/common';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { File } from './files.entity';

@Injectable()
export class FilesService {
  constructor(private readonly genericRepo: GenericRepository<File>) {}

  async selectById(id: number) {
    const file = await this.genericRepo.selectById(id);
    if (!file) {
      throw new NotFoundException('file not found');
    }
    return file;
  }
}
