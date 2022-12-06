import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Category } from 'src/v1/categories/categories.entity';

export class CreateBlogDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsInt({ each: true })
  categories: (Category | number)[];
}
