import { Module } from '@nestjs/common';
import { ConfigsModule } from '../modules/configs/configs.module';
import { DatabaseModule } from '../modules/database/database.module';
import { JwtAuthModule } from '../modules/jwt-auth/jwt-auth.module';

@Module({
  imports: [ConfigsModule, DatabaseModule, JwtAuthModule],
})
export class CoreModule {}
