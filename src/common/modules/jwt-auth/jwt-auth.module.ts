import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthService } from './jwt-auth.service';

@Module({
  imports: [JwtModule.registerAsync({ useClass: JwtAuthService })],
})
export class JwtAuthModule {}
