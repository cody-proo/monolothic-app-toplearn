import { CoreEntity } from 'src/common/core/core.entity';
import { Column, Entity, Tree, TreeChildren, TreeParent } from 'typeorm';

@Tree('materialized-path')
@Entity({ name: '_categories' })
export class Category extends CoreEntity {
  @Column('varchar', { unique: true, name: 'title', nullable: false })
  title: string;

  @Column('varchar', { unique: true, name: 'slug', nullable: false })
  slug: string;

  @TreeParent()
  parentCategories: Category;

  @TreeChildren()
  subCategories: Category;
}
