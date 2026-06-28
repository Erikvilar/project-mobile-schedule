import { Database } from '@nozbe/watermelondb';
import { mySchema } from './schemas';
import { User } from './models/User';

import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { Profile } from '@/database/models/Profile.ts';
import { ModelIA } from '@/database/models/ModelIA.ts';
import { Note } from '@/database/models/Note.ts';

const adapter = new SQLiteAdapter({
  schema: mySchema,
  dbName: 'seikohealthdb',
  onSetUpError: error => {
    console.log('❌ Database Error:', error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [User, Profile,ModelIA,Note],
});
