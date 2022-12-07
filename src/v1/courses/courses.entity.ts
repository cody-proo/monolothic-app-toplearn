import { CoreEntity } from 'src/common/core/core.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Category } from '../categories/categories.entity';
import { Comment } from '../comments/comments.entity';
import { File } from '../files/files.entity';
import { Like } from '../likes/likes.entity';
import { User } from '../users/users.entity';

export enum CourseStatus {
  ACTIVE = 'ACTIVE',
  FINISH = 'FINISH',
  STOP = 'STOP',
}

export enum CourseLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCE = 'ADVANCE',
}

@Entity({ name: '_courses' })
export class Course extends CoreEntity {
  @Column('varchar', { nullable: false, unique: true, name: 'title' })
  title: string;

  @Column('text', { nullable: false, name: 'description' })
  description: string;

  @OneToOne(() => File)
  @JoinColumn()
  image: File;

  @Column('decimal', { name: 'price', nullable: false })
  price: number;

  @Column('varchar', { name: 'status', nullable: false })
  status: CourseStatus;

  @Column('varchar', { name: 'level', nullable: false })
  level: CourseLevel;

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
