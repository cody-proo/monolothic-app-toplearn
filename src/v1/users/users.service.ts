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
import { UpdateUserDTO } from './dtos';
import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/roles.entity';

@Injectable()
export class UsersService {
  @Inject(GenericRepository<User>)
  private readonly userRepo: GenericRepository<User>;

  @Inject(RolesService)
  private readonly rolesService: RolesService;

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
    if (data.role) {
      data.role = (await this.rolesService.selectById(
        data.role as number,
      )) as Role;
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

  async update(id: number, data: UpdateUserDTO) {
    if (
      data.username &&
      (await this.userRepo.select({
        username: data.username,
      }))
    ) {
      throw new BadRequestException('user exist before by username');
    }

    if (data.email && (await this.userRepo.select({ email: data.email }))) {
      throw new BadRequestException('user exist before by email');
    }
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
