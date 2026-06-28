import { tableSchema } from '@nozbe/watermelondb';

export const noteSchema = tableSchema({
  name: 'notes',
  columns: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'content',
      type: 'string',
    },
    {
      name: 'color',
      type: 'string',
      isOptional: true,
    },
    {
      name: 'category',
      type: 'string',
      isOptional: true,
    },

    {
      name: 'is_pinned',
      type: 'boolean',
    },

    {
      name: 'is_archived',
      type: 'boolean',
    },

    {
      name: 'is_favorite',
      type: 'boolean',
    },

    {
      name: 'is_deleted',
      type: 'boolean',
    },

    {
      name: 'created_at',
      type: 'number',
    },

    {
      name: 'updated_at',
      type: 'number',
    },

    {
      name: 'synced_at',
      type: 'number',
      isOptional: true,
    },
  ],
});
