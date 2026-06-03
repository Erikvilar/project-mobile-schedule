import { Model, Relation } from '@nozbe/watermelondb';
import {
  field,
  text,
  readonly,
  date,
  relation,
} from '@nozbe/watermelondb/decorators';
import { User } from '@/database/models/User.ts';

export class Profile extends Model {
  static table = 'profile';

  static associations: any = {
    users: { type: 'belongs_to', key: 'user_id' },
  };


  @text('user_id') userId!: string;
  @text('bio') bio!: string;
  @text('image') image!: string;
  @text('avatar_url') avatarUrl!: string;
  @text('website') website!: string;
  @text('location') location!: string;
  @text('phone') phone!: string;
  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
  @relation('users', 'user_id')
  user!: Relation<User>;

}
