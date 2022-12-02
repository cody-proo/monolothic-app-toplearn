import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Permission } from 'src/v1/permissions/permissions.entity';
import { RefreshToken } from 'src/v1/refresh-token/refresh-token.entity';
import { Role } from 'src/v1/roles/roles.entity';
import { User } from 'src/v1/users/users.entity';
import { Inject } from '@nestjs/common';
import { processConfig } from 'src/common/envs/envs';
import { Course } from 'src/v1/courses/courses.entity';
import { Category } from 'src/v1/categories/categories.entity';
import { Comment } from 'src/v1/comments/comments.entity';
import { Like } from 'src/v1/likes/likes.entity';

export class DatabaseService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  configService: ConfigService;
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      username: this.configService.getOrThrow<string>(processConfig.dbUser),
      password: this.configService.getOrThrow<string>(processConfig.dbPass),
      host: this.configService.getOrThrow<string>(processConfig.dbHost),
      port: +this.configService.getOrThrow<string>(processConfig.dbPort),
      database: this.configService.getOrThrow<string>(processConfig.dbName),
      type: this.configService.getOrThrow<string>(processConfig.dbType) as any,
      entities: [
        RefreshToken,
        User,
        Role,
        Permission,
        Course,
        Category,
        Comment,
        Like,
      ],
    };
  }
}
