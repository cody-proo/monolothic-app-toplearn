import { CoreEntity } from 'src/common/core/core.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Category } from '../categories/categories.entity';
import { Comment } from '../comments/comments.entity';
import { Like } from '../likes/likes.entity';
import { User } from '../users/users.entity';

export enum CourseStatus {
  ACTIVE = 'ACTIVE',
  DEACTIVE = 'DEACTIVE',
}

@Entity({ name: '_courses' })
export class Course extends CoreEntity {
  @Column('varchar', { nullable: false, unique: true, name: 'title' })
  title: string;

  @Column('text', { nullable: false, name: 'description' })
  description: string;

  @Column('text', { nullable: false, name: 'image', unique: true })
  image: string;

  @Column('decimal', { name: 'price', nullable: false })
  price: number;

  @Column('varchar', { name: 'status', nullable: false })
  status: CourseStatus;

  @ManyToOne(() => User, (user) => user.id)
  teacher: User;

  @ManyToMany(() => Category, (categories) => categories.id)
  @JoinColumn()
  categories: Category[];

  @OneToMany(() => Comment, (comment) => comment.id)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.id)
  likes: Like[];
}
