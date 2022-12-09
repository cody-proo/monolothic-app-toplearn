import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesModule } from './roles/roles.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { CoreModule } from 'src/common/core/core.module';
import { CoursesModule } from './courses/courses.module';
import { CategoriesModule } from './categories/categories.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { BlogsModule } from './blogs/blogs.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    CoreModule,
    AuthModule,
    UsersModule,
    PermissionsModule,
    RolesModule,
    RefreshTokenModule,
    CoursesModule,
    CategoriesModule,
    CommentsModule,
    LikesModule,
    BlogsModule,
    FilesModule,
  ],
  providers: [],
  controllers: [],
})
export class V1Module {}
