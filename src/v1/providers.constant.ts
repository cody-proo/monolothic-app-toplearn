import { Provider } from '@nestjs/common';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { Blog } from './blogs/blogs.entity';
import { Category } from './categories/categories.entity';
import { Comment } from './comments/comments.entity';
import { Course } from './courses/courses.entity';
import { File } from './files/files.entity';
import { Like } from './likes/likes.entity';
import { Permission } from './permissions/permissions.entity';
import { RefreshToken } from './refresh-token/refresh-token.entity';
import { Role } from './roles/roles.entity';
import { User } from './users/users.entity';

export const likesRepositoryProvider: Provider = {
  provide: GenericRepository,
  useFactory: () => new GenericRepository(Like),
};

export const commentsRepositoryProvider: Provider = {
  provide: GenericRepository,
  useFactory: () => new GenericRepository(Comment),
};

export const usersRepositoryProvider: Provider = {
  provide: GenericRepository,
  useFactory: () => new GenericRepository(User),
};

export const rolesRepositoryProvider: Provider = {
  provide: GenericRepository,
  useFactory: () => new GenericRepository(Role),
};

export const refreshTokenRepositoryProvider: Provider = {
  provide: GenericRepository,
  useFactory: () => new GenericRepository(RefreshToken),
};

export const permissionRepositoryProvider: Provider = {
  provide: GenericRepository,
  useFactory: () => new GenericRepository(Permission),
};

export const filesRepositoryProvider: Provider = {
  provide: GenericRepository,
  useFactory: () => new GenericRepository(File),
};

export const coursesRepositoryProvider: Provider = {
  provide: GenericRepository,
  useFactory: () => new GenericRepository(Course),
};

export const categoriesRepositoryProvider: Provider = {
  provide: GenericRepository,
  useFactory: () => new GenericRepository(Category),
};

export const blogsRepositoryProvider: Provider = {
  provide: GenericRepository,
  useFactory: () => new GenericRepository(Blog),
};
