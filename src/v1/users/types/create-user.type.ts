import { Role } from 'src/v1/roles/roles.entity';

export interface ICreateUser {
  username: string;
  email: string;
  password: string;
  image?: string;
  bio?: string;
  phone?: string;
  role?: number | Role;
}
