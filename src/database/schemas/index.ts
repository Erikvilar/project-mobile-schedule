
import { appSchema } from '@nozbe/watermelondb';
import { userSchema } from './userSchema';
import { appConfigSchema } from '@/database/schemas/appConfigSchema.ts';
import { profileSchema } from '@/database/schemas/profileSchema.ts';
import { memorySchema } from '@/database/schemas/memorySchema.ts';
import { conversationSchema } from '@/database/schemas/conversationSchema.ts';
import { modelSchema } from '@/database/schemas/modelSchema.ts';
import { noteSchema } from '@/database/schemas/noteSchema.ts';


export const TABLE_USERS = 'users'
export const TABLE_PROFILE = 'profile'
export const TABLE_CONVERSATION = 'conversation';
export const TABLE_MEMORY = 'memory';
export const TABLE_MODEL = 'modelIA';
export const TABLE_MESSAGE = 'message'
export const TABLE_NOTE = 'note'
export const mySchema = appSchema({
  version: 4,
  tables: [userSchema,profileSchema,memorySchema,modelSchema, conversationSchema, appConfigSchema,noteSchema],
});
