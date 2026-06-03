import { Model, Query } from '@nozbe/watermelondb';
import {
  text,
  date,
  readonly,
  children,
} from '@nozbe/watermelondb/decorators';
import { Message } from '@/database/models/Messages.ts';


export class Conversation extends Model {
  static table = 'conversations';

  static associations: any = {
    users: {
      type: 'belongs_to',
      key: 'user_id',
    },
  };

  @text('user_id')
  userId!: string;

  @text('title')
  title!: string;

  @readonly
  @date('created_at')
  createdAt!: Date;

  @children('messages')
  messages!: Query<Message>;
}
