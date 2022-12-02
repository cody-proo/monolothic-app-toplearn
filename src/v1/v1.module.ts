import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesModule } from './roles/roles.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { CoreModule } from 'src/common/core/core.module';

@Module({
  imports: [
    CoreModule,
    AuthModule,
    UsersModule,
    PermissionsModule,
    RolesModule,
    RefreshTokenModule,
  ],
})
export class V1Module {}
