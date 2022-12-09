import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { TokenService } from 'src/common/services/token.service';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [RefreshTokenModule],
  controllers: [AuthController],
  providers: [AuthService, GenericRepository, TokenService, JwtService],
})
export class AuthModule {}
