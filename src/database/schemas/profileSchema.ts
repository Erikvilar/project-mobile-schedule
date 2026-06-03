import { tableSchema } from '@nozbe/watermelondb';

export const profileSchema = tableSchema({
  name: 'profile',
  columns: [

    { name: 'user_id', type: 'string', isIndexed: true },


    { name: 'bio', type: 'string', isOptional: true },
    { name: 'image', type: 'string', isOptional: true }, // Local
    { name: 'avatar_url', type: 'string', isOptional: true }, // Cloud
    { name: 'website', type: 'string', isOptional: true },
    { name: 'location', type: 'string', isOptional: true },
    { name: 'phone', type: 'string', isOptional: true },

    // Datas
    { name: 'created_at', type: 'number' },
    { name: 'updated_at', type: 'number' },
  ],
});
