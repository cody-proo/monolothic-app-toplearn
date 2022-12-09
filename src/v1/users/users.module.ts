import { Module } from '@nestjs/common';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService, GenericRepository],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
