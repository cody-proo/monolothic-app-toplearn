import { PermissionsModule } from './../permissions/permissions.module';
import { Module } from '@nestjs/common';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  controllers: [RolesController],
  providers: [RolesService, GenericRepository],
  imports: [PermissionsModule],
})
export class RolesModule {}
