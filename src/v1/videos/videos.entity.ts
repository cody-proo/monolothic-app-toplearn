import { CoreEntity } from 'src/common/core/core.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Course } from '../courses/courses.entity';

@Entity({ name: '_videos' })
export class Video extends CoreEntity {
  @Column({ name: 'title', type: 'varchar', nullable: false, unique: true })
  title: string;

  @Column({ name: 'description', type: 'text', nullable: false })
  description: string;

  @Column({ name: 'screenshot', type: 'text', nullable: false })
  screenshot: string;

  @Column({ name: 'src', type: 'text', nullable: false })
  src: string;

  @Column({ name: 'order', type: 'int', nullable: false })
  order: number;

  @ManyToOne(() => Course, (course) => course.id)
  course: Course;
}
