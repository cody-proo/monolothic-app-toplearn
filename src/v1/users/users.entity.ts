import { Exclude } from 'class-transformer';
import { CoreEntity } from 'src/common/core/core.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Role } from '../roles/roles.entity';

export enum UserStatus {
  BLOCK = 'BLOCK',
  ACTIVE = 'ACTIVE',
  DISABLE = 'DISABLE',
}

@Entity({ name: '_users' })
export class User extends CoreEntity {
  @Column('varchar', { name: 'user_name', unique: true, nullable: false })
  username: string;

  @Column('varchar', { name: 'email', unique: true, nullable: false })
  email: string;

  @Exclude()
  @Column('text', { name: 'password', nullable: false })
  password: string;

  @Column('text', { name: 'image' })
  image?: string;

  @Column('text', { name: 'bio' })
  bio?: string;

  @Column('varchar', { name: 'phone' })
  phone?: string;

  @Column('varchar', { name: 'first_name' })
  firstName?: string;

  @Column('varchar', { name: 'last_name' })
  lastName?: string;

  @Column('varchar', { name: 'status', default: UserStatus.ACTIVE })
  status: UserStatus;

  @Column('decimal', { name: 'credit', default: 0 })
  credit: number;

  @OneToMany(() => Role, (role) => role.id)
  roles: Role;
}
