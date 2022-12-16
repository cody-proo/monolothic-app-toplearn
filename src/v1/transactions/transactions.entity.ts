import { CoreEntity } from 'src/common/core/core.entity';
import { Entity } from 'typeorm';

@Entity({ name: '_transactions' })
export class Transaction extends CoreEntity {
  // bank
  // amount
  // user
  // registerAt
  // registerBy
  // status
}
