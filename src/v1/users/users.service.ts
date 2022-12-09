import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { hashPassword } from '../auth/helper/hash-password.helper';
import { ICreateUser } from './types';
import { User, UserStatus } from './users.entity';

@Injectable()
export class UsersService {
  @Inject(GenericRepository<User>)
  private readonly userRepo: GenericRepository<User>;

  async create(data: ICreateUser) {
    const user = await this.userRepo.select([
      {
        email: data.email,
      },
      {
        username: data.username,
      },
    ]);

    if (user) {
      throw new BadRequestException('user exist before');
    }
    const passwordHashing = await hashPassword(data.password);
    return this.userRepo.create({
      ...data,
      password: passwordHashing,
    });
  }

  async selectByEmail(email: string) {
    const user = await this.userRepo.select({
      email,
      status: UserStatus.ACTIVE,
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async update(id: number, data: QueryDeepPartialEntity<User>) {
    const user = await this.selectById(id);
    return this.userRepo.update(
      { id: user.id, status: UserStatus.ACTIVE },
      data,
    );
  }

  async selectById(id: number) {
    const user = await this.userRepo.select({ id, status: UserStatus.ACTIVE });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  selectAll() {
    return this.userRepo.selectAll();
  }
}
