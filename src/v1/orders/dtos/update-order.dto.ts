import { IsInt, IsOptional, IsString } from 'class-validator';
import { Course } from 'src/v1/courses/courses.entity';
import { Discount } from 'src/v1/discounts/discounts.entity';
import { User } from 'src/v1/users/users.entity';

export class UpdateOrderDTO {
  @IsInt()
  @IsOptional()
  course?: number | Course;

  @IsInt()
  @IsOptional()
  discount?: number | Discount;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  user?: number | User;
}
