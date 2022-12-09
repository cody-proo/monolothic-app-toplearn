import { Module } from '@nestjs/common';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, GenericRepository],
  exports: [UsersService],
})
export class UsersModule {}
