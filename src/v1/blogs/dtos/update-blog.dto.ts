import { IsInt, IsOptional, IsString } from 'class-validator';
import { Category } from 'src/v1/categories/categories.entity';

export class UpdateBlogDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsInt({ each: true })
  categories?: (Category | number)[];
}
