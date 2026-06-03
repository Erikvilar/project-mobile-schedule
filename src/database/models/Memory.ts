import { Model, Relation } from '@nozbe/watermelondb';
import {
  text,
  date,
  readonly,
  relation,
  field,
} from '@nozbe/watermelondb/decorators';

import { User } from './User';

export class Memory extends Model {
  static table = 'memories';

  static associations: any = {
    users: {
      type: 'belongs_to',
      key: 'user_id',
    },
  };

  @text('user_id')
  userId!: string;

  @text('content')
  content!: string;

  @text('embedding')
  embedding!: string;

  @text('category')
  category!: string;

  @field('importance')
  importance!: number;

  @field('last_accessed')
  lastAccessed!: number;

  @readonly
  @date('created_at')
  createdAt!: Date;

  @relation('users', 'user_id')
  user!: Relation<User>;
}
