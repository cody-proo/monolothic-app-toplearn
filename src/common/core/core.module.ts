import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigsModule } from '../modules/configs/configs.module';
import { DatabaseModule } from '../modules/database/database.module';
import { JwtAuthModule } from '../modules/jwt-auth/jwt-auth.module';
import { TokenService } from '../services/token.service';

@Module({
  imports: [ConfigsModule, DatabaseModule, JwtAuthModule],
  providers: [TokenService, JwtService],
})
export class CoreModule {}
