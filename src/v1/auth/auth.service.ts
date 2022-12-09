import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { User } from '../users/users.entity';
import {
  ForgetPasswordDTO,
  LoginDTO,
  RefreshTokenDTO,
  SignupDTO,
} from './dtos';
import * as bcrypt from 'bcryptjs';
import { TokenService } from 'src/common/services/token.service';
import { hashPassword } from './helper/hash-password.helper';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';

@Injectable()
export class AuthService {
  @Inject(GenericRepository<User>)
  private readonly userRepo: GenericRepository<User>;

  @Inject(TokenService)
  private readonly tokenService: TokenService;

  @Inject(RefreshTokenService)
  private readonly refreshTokenService: RefreshTokenService;

  async signup(data: SignupDTO) {
    const user = this.userRepo.select([
      { username: data.username },
      { email: data.email },
    ]);

    if (user) {
      throw new BadRequestException('user exist before');
    }
    const passwordHashing = await hashPassword(data.password);
    const newUser = await this.userRepo.create({
      ...data,
      password: passwordHashing,
    });
    const token = this.tokenService.generateToken({ id: newUser.id });
    const refreshToken = this.tokenService.generateRefreshToken();
    await this.refreshTokenService.create(refreshToken, newUser);
    return { token, refreshToken };
  }

  async login(data: LoginDTO) {
    const user = await this.userRepo.select({ email: data.email });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const passwordMatching = await bcrypt.compare(data.password, user.password);
    if (!passwordMatching) {
      throw new BadRequestException(
        'email and password doesnot match with any user',
      );
    }
    const token = this.tokenService.generateToken({ id: user.id });
    const refreshToken = this.tokenService.generateRefreshToken();
    await this.refreshTokenService.create(refreshToken, user);
    return { token, refreshToken };
  }

  async forgetPassword(data: ForgetPasswordDTO) {
    const user = await this.userRepo.select({ email: data.email });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const newPasswordHashing = await hashPassword(data.newPassword);
    await this.userRepo.update(
      { id: user.id },
      { password: newPasswordHashing },
    );
    return { message: 'your password updated, login again ...' };
  }

  async refreshToken(data: RefreshTokenDTO, user: User) {
    const refreshToken = await this.refreshTokenService.select(
      data.refreshToken,
      user,
    );
    const token = await this.tokenService.generateToken({
      id: refreshToken.user.id,
    });
    const newExpiresAt = { ...refreshToken.expiredAt };
    newExpiresAt.setHours(
      newExpiresAt.getHours() + this.refreshTokenService.expiresAtHour,
    );
    await this.refreshTokenService.update(refreshToken.id, {
      expiredAt: newExpiresAt,
    });
    return { token, refreshToken: refreshToken.code };
  }
}
