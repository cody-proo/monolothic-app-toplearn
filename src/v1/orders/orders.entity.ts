import { CoreEntity } from 'src/common/core/core.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Course } from '../courses/courses.entity';
import { Discount } from '../discounts/discounts.entity';

@Entity({ name: '_orders' })
export class Order extends CoreEntity {
  @ManyToOne(() => Course, (course) => course.id)
  course: Course;

  @ManyToOne(() => Discount, (discount) => discount.id, { nullable: true })
  discount?: Discount;

  @Column({ name: 'finalAmount', type: 'decimal', nullable: false })
  finalAmount: number;

  @Column({ name: 'email', type: 'varchar' })
  email?: string;

  @Column({ name: 'description', type: 'text' })
  description?: string;
}
