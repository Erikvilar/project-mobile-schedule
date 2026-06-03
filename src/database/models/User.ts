import { Model, Associations, Query } from '@nozbe/watermelondb';
import {
  field,
  text,
  children,
} from '@nozbe/watermelondb/decorators';
import { Profile } from '@/database/models/Profile.ts';
import { Memory } from '@/database/models/Memory.ts';
import { Conversation } from '@/database/models/Conversation.ts';

export class User extends Model {
  static table = 'users';

  static associations: Associations = {
    profile: {
      type: 'has_many',
      foreignKey: 'user_id'
    },
    memories: {
      type: 'has_many',
      foreignKey: 'user_id',
    },
    conversations: {
      type: 'has_many',
      foreignKey: 'user_id',
    },
  };

  @text('name') name!: string;
  @text('email') email!: string;
  @field('age') age!: number;
  @children('profile')
  profile!: Query<Profile>;
  @children('memories')
  memories!: Query<Memory>;

  @children('conversations')
  conversations!: Query<Conversation>;
}
