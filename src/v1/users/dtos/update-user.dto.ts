import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserStatus } from '../users.entity';

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  @MinLength(3)
  username: string;

  @IsOptional()
  @IsEmail()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  bio: string;

  @IsOptional()
  @IsString()
  @IsMobilePhone('fa-IR')
  phone: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  firstName: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  lastName: string;

  @IsOptional()
  @IsString()
  @IsEnum(UserStatus)
  status: UserStatus;
}
