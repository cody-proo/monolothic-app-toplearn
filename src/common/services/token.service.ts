import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';

export interface ITokenServicePayload {
  id: number;
}

export class TokenService {
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  generateToken(data: ITokenServicePayload) {
    return this.jwtService.sign(data, { expiresIn: '24h' });
  }

  generateRefreshToken() {
    const code = randomBytes(10).toString('hex');
    return code;
  }
}
