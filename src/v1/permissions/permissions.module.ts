import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { GenericRepository } from 'src/common/repositories/generic.repository';

@Module({
  providers: [PermissionsService, GenericRepository],
  controllers: [PermissionsController],
})
export class PermissionsModule {}
