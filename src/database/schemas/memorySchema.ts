import { tableSchema } from '@nozbe/watermelondb';

export const memorySchema = tableSchema({
  name: 'memories',
  columns: [
    {
      name: 'user_id',
      type: 'string',
      isIndexed: true,
    },
    {
      name: 'content',
      type: 'string',
    },
    {
      name: 'embedding',
      type: 'string',
    },
    {
      name: 'category',
      type: 'string',
      isOptional: true,
    },
    {
      name: 'created_at',
      type: 'number',
    },
  ],
});
