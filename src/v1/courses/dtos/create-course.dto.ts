import {
  IsDecimal,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Category } from 'src/v1/categories/categories.entity';
import { CourseLevel, CourseStatus } from '../courses.entity';

export class CreateCourseDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  image: number;

  @IsNotEmpty()
  @IsDecimal(true)
  price: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(CourseStatus)
  status: CourseStatus;

  @IsNotEmpty()
  @IsString()
  @IsEnum(CourseLevel)
  level: CourseLevel;

  @IsNotEmpty()
  @IsInt({ each: true })
  categories: (Category | number)[];
}
