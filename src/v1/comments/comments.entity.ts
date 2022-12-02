import { CoreEntity } from 'src/common/core/core.entity';
import {
  Column,
  Entity,
  ManyToOne,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { User } from '../users/users.entity';

@Tree('materialized-path')
@Entity({ name: '_comments' })
export class Comment extends CoreEntity {
  @Column('text', { name: 'text', nullable: false })
  text: string;

  @ManyToOne(() => User, (user) => user.id)
  author: User;

  @TreeParent()
  parentComment: Comment;

  @TreeChildren()
  childrenComment: Comment;
}
