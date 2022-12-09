import { Module } from '@nestjs/common';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { RefreshTokenService } from './refresh-token.service';

@Module({
  providers: [RefreshTokenService, GenericRepository],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
