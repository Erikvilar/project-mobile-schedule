import { tableSchema } from '@nozbe/watermelondb';

export const conversationSchema = tableSchema({
  name: 'conversations',
  columns: [
    {
      name: 'user_id',
      type: 'string',
      isIndexed: true,
    },
    {
      name: 'question',
      type: 'string',
    },
    {
      name: 'answer',
      type: 'string',
    },
    {
      name: 'created_at',
      type: 'number',
    },
  ],
});
