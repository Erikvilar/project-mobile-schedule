import { Model, Relation } from '@nozbe/watermelondb';
import { date, readonly, relation, text } from '@nozbe/watermelondb/decorators';
import { Conversation } from '@/database/models/Conversation.ts';

export class Message extends Model {
  static table = 'messages';

  static associations:any = {
    conversations: {
      type: 'belongs_to',
      key: 'conversation_id',
    },
  };

  @text('conversation_id')
  conversationId!: string;

  @text('role')
  role!: string;

  @text('content')
  content!: string;

  @readonly
  @date('created_at')
  createdAt!: Date;

  @relation('conversations', 'conversation_id')
  conversation!: Relation<Conversation>;
}
