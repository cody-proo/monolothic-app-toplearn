import { Exclude } from 'class-transformer';
import { CoreEntity } from 'src/common/core/core.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { File } from '../files/files.entity';
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

  @ManyToOne(() => File, (file) => file.id)
  image?: File;

  @Column('text', { name: 'bio', nullable: true })
  bio?: string;

  @Column('varchar', { name: 'phone', nullable: true })
  phone?: string;

  @Column('varchar', { name: 'first_name', nullable: true })
  firstName?: string;

  @Column('varchar', { name: 'last_name', nullable: true })
  lastName?: string;

  @Column('varchar', { name: 'status', default: UserStatus.ACTIVE })
  status: UserStatus;

  @Column('decimal', { name: 'credit', default: 0 })
  credit: number;

  @OneToMany(() => Role, (role) => role.id)
  roles: Role;
}
